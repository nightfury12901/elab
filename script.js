class ElabAnswers {
    constructor() {
        // Check if dsaQuestions is available
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
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
            
            searchInput.addEventListener('input', () => this.showSearchSuggestions());
        }

        // Category filter buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterByCategory(category);
                
                // Update active button
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Clear filters
        const clearBtn = document.getElementById('clearFilters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearFilters());
        }
    }

    performSearch() {
        const query = document.getElementById('searchInput').value.toLowerCase().trim();
        
        if (!query) {
            this.filteredQuestions = [...this.questions];
        } else {
            this.filteredQuestions = this.questions.filter(q => 
                q.question.toLowerCase().includes(query) ||
                q.description.toLowerCase().includes(query) ||
                q.category.toLowerCase().includes(query) ||
                q.keywords.some(keyword => keyword.toLowerCase().includes(query))
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
        
        // Add matching keywords
        this.questions.forEach(q => {
            q.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(query) && suggestions.size < 5) {
                    suggestions.add(keyword);
                }
            });
        });
        
        // Add matching categories
        this.questions.forEach(q => {
            if (q.category.toLowerCase().includes(query) && suggestions.size < 5) {
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
        if (suggestionsDiv) {
            suggestionsDiv.style.display = 'none';
        }
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

    clearFilters() {
        this.filteredQuestions = [...this.questions];
        this.currentPage = 1;
        document.getElementById('searchInput').value = '';
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.category-btn[data-category="ALL"]').classList.add('active');
        this.renderQuestions();
        this.renderPagination();
        this.hideSearchSuggestions();
    }

    renderQuestions() {
        const container = document.getElementById('questionsContainer');
        if (!container) return;
        
        const startIndex = (this.currentPage - 1) * this.questionsPerPage;
        const endIndex = startIndex + this.questionsPerPage;
        const currentQuestions = this.filteredQuestions.slice(startIndex, endIndex);
        
        if (currentQuestions.length === 0) {
            container.innerHTML = '<div class="no-results">No questions found matching your criteria.</div>';
            return;
        }
        
        container.innerHTML = currentQuestions.map(q => `
            <div class="question-card" data-id="${q.id}">
                <div class="question-header">
                    <span class="question-id">Q${q.id}</span>
                    <span class="question-category">${q.category}</span>
                </div>
                <h3 class="question-title">${q.question}</h3>
                <p class="question-description">${q.description}</p>
                <div class="question-constraints">
                    <strong>Constraints:</strong> ${q.constraints}
                </div>
                ${q.sampleInput ? `
                    <div class="sample-io">
                        <div class="sample-input">
                            <strong>Sample Input:</strong>
                            <pre>${q.sampleInput}</pre>
                        </div>
                        <div class="sample-output">
                            <strong>Sample Output:</strong>
                            <pre>${q.sampleOutput}</pre>
                        </div>
                    </div>
                ` : ''}
                <div class="code-section">
                    <div class="code-header">
                        <strong>Solution:</strong>
                        <button class="copy-btn" onclick="copyCode(${q.id})">Copy Code</button>
                    </div>
                    <pre><code class="language-c" id="code-${q.id}">${this.escapeHtml(q.code)}</code></pre>
                </div>
                <div class="question-keywords">
                    <strong>Keywords:</strong>
                    ${q.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        // Re-highlight code after rendering
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }

    renderPagination() {
        const container = document.getElementById('paginationContainer');
        if (!container) return;
        
        const totalPages = Math.ceil(this.filteredQuestions.length / this.questionsPerPage);
        
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button class="page-btn" onclick="elabAnswers.goToPage(${this.currentPage - 1})">Previous</button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="page-btn active">${i}</button>`;
            } else {
                paginationHTML += `<button class="page-btn" onclick="elabAnswers.goToPage(${i})">${i}</button>`;
            }
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="page-btn" onclick="elabAnswers.goToPage(${this.currentPage + 1})">Next</button>`;
        }
        
        container.innerHTML = paginationHTML;
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderQuestions();
        this.renderPagination();
        document.getElementById('questionsContainer').scrollIntoView({ behavior: 'smooth' });
    }

    populateSearchSuggestions() {
        // Pre-populate search suggestions for better UX
        this.allKeywords = new Set();
        this.questions.forEach(q => {
            q.keywords.forEach(keyword => this.allKeywords.add(keyword));
        });
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Global functions for onclick handlers
function copyCode(questionId) {
    const codeElement = document.getElementById(`code-${questionId}`);
    if (codeElement) {
        navigator.clipboard.writeText(codeElement.textContent).then(() => {
            // Show feedback
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.backgroundColor = '#27ae60';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 2000);
        });
    }
}

function searchSuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
    if (window.elabAnswers) {
        window.elabAnswers.performSearch();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.elabAnswers = new ElabAnswers();
});
