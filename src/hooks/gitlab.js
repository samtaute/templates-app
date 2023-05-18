
export default function useGitlab() {
    async function getBranches(token) {
        let branches = [];

        for (let i = 0; i < 7; i++) {
            let requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/branches?per_page=100&page=${i}`

            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    "PRIVATE-TOKEN": token,
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

    async function createBranch(branchname, token) {
        console.log(branchname);
        let requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/branches?branch=${branchname}&ref=master`
        let update = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'PRIVATE-TOKEN': token,
                'Content-Type': 'application/json'
            }
        })
        if (update.ok) {
            console.log('branch created')
        } else {
            console.log('not ok')
        }

    }

    async function getFilenames(branchName, token) {
        let filenames = [];
        let baseUrl = `https://gitlab.com/api/v4/projects/31495766/repository/tree?path=content%2Fsrc%2Fraw%2Fpages%2Fcontent_pages%2F&per_page=100&ref=${branchName}`
        for (let i = 0; i < 7; i++) {
            let requestUrl = baseUrl + `&page=${i}`
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    "PRIVATE-TOKEN": token
                }
            });
            if (response.ok) {
                const data = await response.json();
                for (let page of data) {
                    if (!page.name.includes('index')){
                        filenames.push(page.name);
                    }
                }
            }
        }
        baseUrl = `https://gitlab.com/api/v4/projects/31495766/repository/tree?path=content%2Fsrc%2Fraw%2Fpages%2Fportals%2F&per_page=100&ref=${branchName}`
        for (let i = 0; i < 7; i++) {
            let requestUrl = baseUrl + `&page=${i}`
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    "PRIVATE-TOKEN": token
                }
            });
            if (response.ok) {
                const data = await response.json();
                for (let page of data) {
                    if (!page.name.includes('index')){
                        filenames.push(page.name);
                    }
                }
            }
        }

        return filenames;
    }

    async function getRawFile(filename, branchName, token) {
        if (!branchName) {
            branchName = 'master'
        }

        let requestUrl; 
        
        if(filename.includes('portal') && !filename.includes('index')){
            requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/files/content%2Fsrc%2Fraw%2Fpages%2Fportals%2F${filename}/raw?ref=${branchName}`
        }else{
            requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/files/content%2Fsrc%2Fraw%2Fpages%2Fcontent_pages%2F${filename}/raw?ref=${branchName}`;
        }


        const rawFile = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                "PRIVATE-TOKEN": token
            }
        });
        if (rawFile.ok) {
            let data = await rawFile.json();
            return data;
        } else {
            console.log('no data found');
        }
    }
    return { getBranches, getFilenames, createBranch, getRawFile};
}


