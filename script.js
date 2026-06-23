// script.js

const GITHUB_USERNAME = 'mukunthpr-dev';

// Map colors to languages for the badges
const languageColors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#F05138',
    'Kotlin': '#A97BFF',
    'Vue': '#41b883',
    'Shell': '#89e051'
};

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the repositories page by looking for the container
    const reposContainer = document.getElementById('repos-container');
    
    if (reposContainer) {
        fetchRepositories(reposContainer);
    }
});

async function fetchRepositories(container) {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=9`);
        
        if (!response.ok) {
            throw new Error(`GitHub API returned status ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Remove loader
        container.innerHTML = '';
        
        if (repos.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No repositories found.</div>';
            return;
        }

        repos.forEach((repo, index) => {
            // Add staggered delay for animation
            const delay = 0.1 * index;
            const langColor = languageColors[repo.language] || '#6d28d9';
            
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animation = `fadeInUp 0.6s ease-out ${delay}s both`;
            
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description provided.'}</p>
                <div class="card-footer">
                    <div class="language-badge">
                        <span class="language-color" style="background-color: ${langColor};"></span>
                        <span>${repo.language || 'Unknown'}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link">View Repo &rarr;</a>
                </div>
            `;
            
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error fetching repositories:', error);
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; background: rgba(255,50,50,0.1); padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,50,50,0.2);">
                <h3 style="color: #ff6b6b; margin-bottom: 0.5rem;">Oops!</h3>
                <p style="color: var(--text-secondary);">Failed to load repositories. Please check the GitHub username or API limits.</p>
            </div>
        `;
    }
}
