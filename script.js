// Wait until data and DOM are loaded
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");

  // Defensive: If data.js is not loaded, show error.
  if (typeof dsaQuestions === "undefined") {
    resultsDiv.innerHTML = "<p style='color:red;'>Error: Data not loaded. Please make sure data.js is included before script.js</p>";
    return;
  }

  // Function to escape HTML to prevent XSS in code display
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Search function - filters questions based on query string (case-insensitive)
  function searchQuestions(query) {
    if (!query) return [];

    const q = query.toLowerCase().trim();
    return dsaQuestions.filter(({ question, description, category, keywords }) => {
      if (category && category.toLowerCase().includes(q)) return true;
      if (question && question.toLowerCase().includes(q)) return true;
      if (description && description.toLowerCase().includes(q)) return true;
      if (keywords && keywords.some(k => k.toLowerCase().includes(q))) return true;
      return false;
    });
  }

  // Render search results as cards
  function renderResults(results) {
    if (results.length === 0) {
      resultsDiv.innerHTML = `<p class="no-results">No matching questions found.</p>`;
      return;
    }

    resultsDiv.innerHTML = results
      .map(
        (item) => `
      <div class="card" tabindex="0" aria-label="DSA question ${item.id}">
        <div class="category">${item.category}</div>
        <h2>${escapeHtml(item.question)}</h2>
        <p><strong>Description:</strong> ${escapeHtml(item.description)}</p>
        <p><strong>Constraints:</strong> ${escapeHtml(item.constraints || "N/A")}</p>
        <details>
          <summary>Show Code</summary>
          <pre class="code-container">${escapeHtml(item.code || "No code available")}</pre>
        </details>
      </div>
    `
      )
      .join("");
  }

  // On input event: Update results dynamically
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    if (query.length < 2) {
      resultsDiv.innerHTML = `<p class="no-results">Type at least 2 characters to search.</p>`;
      return;
    }
    const matched = searchQuestions(query);
    renderResults(matched);
  });

  // Initial message
  resultsDiv.innerHTML = `<p class="no-results">Type at least 2 characters to search questions.</p>`;
});
