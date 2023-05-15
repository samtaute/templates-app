
export default function useGitlab() {
    async function getBranches() {
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

    async function createBranch(branchname){
        console.log(branchname); 
        let requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/branches?branch=${branchname}&ref=master`
        let update = await fetch(requestUrl, {
            method: 'POST',
            headers: {
              'PRIVATE-TOKEN': 'glpat-jyMdXVXNnTcsr8_omboM',
              'Content-Type': 'application/json'
            }
          })
          if (update.ok) {
            console.log('branch created')
          }else{
            console.log('not ok')
          }

    }

    async function getFilenames(branchName) {
        let filenames = [];

        let baseUrl = `https://gitlab.com/api/v4/projects/31495766/repository/tree?path=content%2Fsrc%2Fraw%2Fpages%2Fcontent_pages%2F&per_page=100&ref=${branchName}`
        for (let i = 0; i < 7; i++) {
            let requestUrl = baseUrl + `&page=${i}`
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    "PRIVATE-TOKEN": "glpat-jyMdXVXNnTcsr8_omboM"
                }
            });
            if (response.ok) {
                const data = await response.json();
                for (let page of data) {
                    filenames.push(page.name);
                }
            }
        }
        return filenames;
    }
    return {getBranches, getFilenames, createBranch};
}
