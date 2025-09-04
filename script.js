class ElabAnswers {
    constructor() {
        if (typeof dsaQuestions === 'undefined') {
            console.error('dsaQuestions is not defined. Make sure data.js is loaded first.');
            return;
        }
        this.questions = dsaQuestions;
        this.filteredQuestions = [...this.questions];
        this.currentPage = 1;
        this.questionsPerPage = 10;
        this.init();
    }
    init() {
        this.renderQuestions();
        this.renderPagination();
        this.bindEvents();
        this.populateSearchSuggestions();
    }
    bindEvents() {
        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        if (searchBtn) searchBtn.addEventListener('click', () => this.performSearch());
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
            searchInput.addEventListener('input', () => this.showSearchSuggestions());
        }
        // Category filter buttons (optional)
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterByCategory(category);
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }
    performSearch() {
        const query = document.getElementById('searchInput').value.toLowerCase().trim();
        if (!query) {
            this.filteredQuestions = [...this.questions];
        } else {
            this.filteredQuestions = this.questions.filter(q =>
                q.question.toLowerCase().includes(query) ||
                (q.description && q.description.toLowerCase().includes(query)) ||
                (q.category && q.category.toLowerCase().includes(query)) ||
                (q.keywords && q.keywords.some(keyword => keyword.toLowerCase().includes(query)))
            );
        }
        this.currentPage = 1;
        this.renderQuestions();
        this.renderPagination();
        this.hideSearchSuggestions();
    }
    showSearchSuggestions() {
        const query = document.getElementById('searchInput').value.toLowerCase().trim();
        const suggestionsDiv = document.getElementById('searchSuggestions');
        if (!suggestionsDiv) return;
        if (query.length < 2) {
            suggestionsDiv.style.display = 'none';
            return;
        }
        const suggestions = new Set();
        this.questions.forEach(q => {
            q.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(query) && suggestions.size < 5) {
                    suggestions.add(keyword);
                }
            });
            if (q.category && q.category.toLowerCase().includes(query) && suggestions.size < 5) {
                suggestions.add(q.category);
            }
        });
        if (suggestions.size > 0) {
            suggestionsDiv.innerHTML = Array.from(suggestions)
                .map(suggestion => `<div class="suggestion-item" onclick="searchSuggestion('${suggestion}')">${suggestion}</div>`)
                .join('');
            suggestionsDiv.style.display = 'block';
        } else {
            suggestionsDiv.style.display = 'none';
        }
    }
    hideSearchSuggestions() {
        const suggestionsDiv = document.getElementById('searchSuggestions');
        if (suggestionsDiv) { suggestionsDiv.style.display = 'none'; }
    }
    filterByCategory(category) {
        if (category === 'ALL') {
            this.filteredQuestions = [...this.questions];
        } else {
            this.filteredQuestions = this.questions.filter(q => q.category === category);
        }
        this.currentPage = 1;
        this.renderQuestions();
        this.renderPagination();
    }
    renderQuestions() {
        const container = document.getElementById('questionsContainer');
        const notFound = document.getElementById('notFoundSection');
        if (!container) return;
        const startIndex = (this.currentPage - 1) * this.questionsPerPage;
        const endIndex = startIndex + this.questionsPerPage;
        const currentQuestions = this.filteredQuestions.slice(startIndex, endIndex);
        if (this.filteredQuestions.length === 0) {
            container.innerHTML = '';
            if (notFound) notFound.style.display = 'block';
        } else {
            if (notFound) notFound.style.display = 'none';
            container.innerHTML = currentQuestions.map(q => `
            <div class="question-card" data-id="${q.id}">
                <div class="question-header">
                    <span class="question-id">Q${q.id}</span>
                    <span class="question-category">${q.category}</span>
                </div>
                <h3 class="question-title">${this.sanitize(q.question)}</h3>
                <p class="question-description">${this.sanitize(q.description || '')}</p>
                <div class="question-constraints">
                    <strong>Constraints:</strong> ${this.sanitize(q.constraints || '')}
                </div>
                ${(q.sampleInput || q.sampleOutput) ? `
                    <div class="sample-io">
                        ${q.sampleInput ? `<div class="sample-input"><strong>Sample Input:</strong><pre>${this.sanitize(q.sampleInput)}</pre></div>` : ""}
                        ${q.sampleOutput ? `<div class="sample-output"><strong>Sample Output:</strong><pre>${this.sanitize(q.sampleOutput)}</pre></div>` : ""}
                    </div>
                    ` : ''
                }
                <div class="code-section">
                    <div class="code-header">
                        <strong>Solution:</strong>
                        <button class="copy-btn" onclick="copyCode(event, ${q.id})">Copy Code</button>
                    </div>
                    <pre><code class="language-c" id="code-${q.id}">${this.escapeHtml(q.code)}</code></pre>
                </div>
                <div class="question-keywords">
                    <strong>Keywords:</strong>
                    ${q.keywords.map(keyword => `<span class="keyword-tag">${this.sanitize(keyword)}</span>`).join('')}
                </div>
            </div>
        `).join('');
            if (typeof Prism !== 'undefined') Prism.highlightAll();
        }
    }
    renderPagination() {
        const container = document.getElementById('paginationContainer');
        if (!container) return;
        const totalPages = Math.ceil(this.filteredQuestions.length / this.questionsPerPage) || 1;
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        let html = '';
        if (this.currentPage > 1) {
            html += `<button class="page-btn" onclick="elabAnswers.goToPage(${this.currentPage-1})">Previous</button>`;
        }
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                html += `<button class="page-btn active">${i}</button>`;
            } else if (i === 1 || i === totalPages || Math.abs(i - this.currentPage) <= 1) {
                html += `<button class="page-btn" onclick="elabAnswers.goToPage(${i})">${i}</button>`;
            } else if (Math.abs(i - this.currentPage) === 2) {
                html += `<span style="color:#557aad;">...</span>`;
            }
        }
        if (this.currentPage < totalPages) {
            html += `<button class="page-btn" onclick="elabAnswers.goToPage(${this.currentPage+1})">Next</button>`;
        }
        container.innerHTML = html;
    }
    goToPage(page) {
        this.currentPage = page;
        this.renderQuestions();
        this.renderPagination();
        document.getElementById('questionsContainer').scrollIntoView({ behavior: 'smooth' });
    }
    populateSearchSuggestions() {
        this.allKeywords = new Set();
        this.questions.forEach(q => {
            if (q.keywords) q.keywords.forEach(keyword => this.allKeywords.add(keyword));
        });
    }
    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    sanitize(str) {
        if (!str) return '';
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}
// Copy code handler (pass event for "Copied!" feedback)
function copyCode(event, questionId) {
    const codeElement = document.getElementById(`code-${questionId}`);
    if (codeElement) {
        navigator.clipboard.writeText(codeElement.textContent).then(() => {
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.backgroundColor = '#27ae60';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 1400);
        });
    }
}
// Global search suggestion function
function searchSuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
    if (window.elabAnswers) window.elabAnswers.performSearch();
}
// "Try Another Search" (clear all)
function clearSearch() {
    document.getElementById('searchInput').value = '';
    if (window.elabAnswers) {
        window.elabAnswers.filteredQuestions = [...window.elabAnswers.questions];
        window.elabAnswers.currentPage = 1;
        window.elabAnswers.renderQuestions();
        window.elabAnswers.renderPagination();
    }
    document.getElementById('notFoundSection').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function() {
    window.elabAnswers = new ElabAnswers();
});
