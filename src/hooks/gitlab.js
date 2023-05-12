export default function useGitlab(){
    async function loadBranches() {
        let branches = [];
    
        for (let i = 0; i < 7; i++) {
            let requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/branches?per_page=100&page=${i}`
    
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    "PRIVATE-TOKEN": "glpat-jyMdXVXNnTcsr8_omboM"
                }
            });
            if (response.ok) {
                const data = await response.json();
                for (let branch of data) {
                    branches.push(branch.name);
                }
            }
    
    
    
        }
        return branches; 
    }
    return [loadBranches]; 
}
