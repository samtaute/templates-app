import store from './store/index'

export async function loadNeptuneRepo(branchName) {
        if(!branchName){
            branchName = 'master'
        }
        let filenames = await getFilenames(branchName);

        if(filenames.length=== 0){
            store.state.alerts.push({
                type: 'alert-danger', 
                message: 'Could not load files'
            })
            return; 
        }
        filenames = filenames.filter((name) => name.includes("en__") && !name.includes("archive"))
    
        for (let filename of filenames) {
            store.state.pageDirectory[filename] = await getRawFile(filename, branchName);
        }
        store.state.alerts.push({
            type: 'alert-success',
            message: 'neptune directory is loaded'
        })
        localStorage.setItem('pageDirectory', JSON.stringify(store.state.pageDirectory))
}
async function getFilenames(branchName) {
    let filenames = [];

    let baseUrl = `https://gitlab.com/api/v4/projects/31495766/repository/tree?path=content%2Fsrc%2Fraw%2Fpages%2Fcontent_pages%2F&per_page=100&ref=${branchName}`
    for (let i = 0; i < 7; i++) {
        let requestUrl = baseUrl + `&page=${i}`
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                "PRIVATE-TOKEN": "glpat-aKXWYcCDHts39zJPenmS"
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

export async function getRawFile(filename, branchName) {
    if (!branchName){
        branchName = 'master'
    }
    let requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/files/content%2Fsrc%2Fraw%2Fpages%2Fcontent_pages%2F${filename}/raw?ref=${branchName}`;

    const rawFile = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            "PRIVATE-TOKEN": "glpat-aKXWYcCDHts39zJPenmS"
        }
    }); 
    if(rawFile.ok){
        let data  = await rawFile.json(); 
        return data;
    }else{
        console.log('no data found'); 
    }
   
}