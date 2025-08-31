class ElabAnswers {
    constructor() {
        this.questions = dsaQuestions;
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.resultsSection = document.getElementById('resultsSection');
        this.resultsContent = document.getElementById('resultsContent');
        this.notFoundSection = document.getElementById('notFoundSection');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Search button click
        this.searchBtn.addEventListener('click', () => this.performSearch());
        
        // Enter key press
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Input change for real-time search
        this.searchInput.addEventListener('input', () => {
            if (this.searchInput.value.length > 2) {
                this.showSearchSuggestions();
            }
        });
    }

    performSearch() {
        const query = this.searchInput.value.trim().toLowerCase();
        
        if (!query) {
            this.showError('Please enter a search query');
            return;
        }

        this.showLoading(true);
        
        // Simulate API delay for better UX
        setTimeout(() => {
            const results = this.searchQuestions(query);
            this.showLoading(false);
            
            if (results.length > 0) {
                this.displayResults(results);
            } else {
                this.showNotFound();
            }
        }, 800);
    }

    searchQuestions(query) {
        const searchTerms = query.split(' ').filter(term => term.length > 1);
        
        return this.questions.filter(question => {
            const searchText = [
                question.question,
                question.description,
                question.category,
                ...question.keywords
            ].join(' ').toLowerCase();

            return searchTerms.some(term => {
                // Exact match gets highest priority
                if (searchText.includes(term)) return true;
                
                // Fuzzy matching for typos
                return this.fuzzyMatch(term, searchText);
            });
        }).sort((a, b) => {
            // Sort by relevance (how many search terms match)
            const aMatches = searchTerms.filter(term => 
                a.keywords.some(keyword => keyword.includes(term))
            ).length;
            const bMatches = searchTerms.filter(term => 
                b.keywords.some(keyword => keyword.includes(term))
            ).length;
            
            return bMatches - aMatches;
        });
    }

    fuzzyMatch(term, text, threshold = 0.6) {
        // Simple fuzzy matching - you can enhance this
        const words = text.split(' ');
        return words.some(word => {
            if (word.length < 3 || term.length < 3) return false;
            
            const similarity = this.calculateSimilarity(term, word);
            return similarity >= threshold;
        });
    }

    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    displayResults(results) {
        this.hideAllSections();
        this.resultsSection.style.display = 'block';
        
        this.resultsContent.innerHTML = results.map(question => this.createResultCard(question)).join('');
        
        // Initialize code highlighting
        setTimeout(() => {
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }
        }, 100);
    }

    createResultCard(question) {
        const codeLanguage = question.code.includes('#include') ? 'c' : 'cpp';
        
        return `
            <div class="result-card" data-question-id="${question.id}">
                <div class="result-header">
                    <div class="result-icon">
                        <i class="fas fa-code"></i>
                    </div>
                    <div class="result-title">
                        <h2>${this.truncateText(question.question, 100)}</h2>
                        <div class="result-meta">
                            <span class="meta-tag">${question.category}</span>
                            <span class="meta-tag">Question #${question.id}</span>
                        </div>
                    </div>
                </div>
                
                <div class="result-content">
                    <div class="question-text">
                        <p><strong>Problem:</strong> ${question.description}</p>
                        ${question.constraints ? `<p><strong>Constraints:</strong> ${question.constraints}</p>` : ''}
                        ${question.sampleInput ? `
                            <p><strong>Sample Input:</strong></p>
                            <pre>${question.sampleInput}</pre>
                            <p><strong>Sample Output:</strong> ${question.sampleOutput}</p>
                        ` : ''}
                    </div>
                    
                    <div class="code-section">
                        <h3><i class="fas fa-terminal"></i> Solution Code</h3>
                        <div class="code-container">
                            <div class="code-header">
                                <span class="code-language">${codeLanguage.toUpperCase()}</span>
                                <button class="copy-btn" onclick="copyCode(${question.id})">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                            <pre class="code-block"><code class="language-${codeLanguage}" id="code-${question.id}">${this.escapeHtml(question.code)}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showNotFound() {
        this.hideAllSections();
        this.notFoundSection.style.display = 'block';
    }

    showLoading(show) {
        const btnText = this.searchBtn.querySelector('.btn-text');
        const btnLoading = this.searchBtn.querySelector('.btn-loading');
        
        if (show) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            this.searchBtn.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            this.searchBtn.disabled = false;
        }
    }

    hideAllSections() {
        this.resultsSection.style.display = 'none';
        this.notFoundSection.style.display = 'none';
    }

    showError(message) {
        alert(message); // You can replace this with a better error display
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global functions
function searchSuggestion(query) {
    document.getElementById('searchInput').value = query;
    app.performSearch();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    app.hideAllSections();
}

function copyCode(questionId) {
    const codeElement = document.getElementById(`code-${questionId}`);
    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const copyBtn = codeElement.closest('.code-container').querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = 'rgba(16, 185, 129, 0.2)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = 'transparent';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
}

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ElabAnswers();
});
