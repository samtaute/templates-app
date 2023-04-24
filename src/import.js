import store from './store/index'


export async function loadNeptuneRepo() {
    let filenames = await getFilenames(); 
    filenames = filenames.filter((name) => name.includes("en__") && !name.includes("archive"))

    for (let filename of filenames){
        store.state.pageDirectory[filename]= await getRawFile(filename); 
    }
}
async function getFilenames(){
    let filenames = [];

    let baseUrl = "https://gitlab.com/api/v4/projects/31495766/repository/tree?path=content%2Fsrc%2Fraw%2Fpages%2Fcontent_pages%2F&per_page=100"
    for (let i = 0; i < 7; i++) {
        let requestUrl = baseUrl + `&page=${i}`
        await fetch(requestUrl, {
            method: 'GET',
            headers: {
                "PRIVATE-TOKEN": "glpat-aKXWYcCDHts39zJPenmS"
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            for (let page of data) {
                filenames.push(page.name)
            }
        })
    }
    return filenames; 
}

async function getRawFile(filename){
    let requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/files/content%2Fsrc%2Fraw%2Fpages%2Fcontent_pages%2F${filename}/raw?ref=master`; 
    const rawFile = await fetch(requestUrl,  {
        method: 'GET',
        headers: {
            "PRIVATE-TOKEN": "glpat-aKXWYcCDHts39zJPenmS"
        }
    }).then((response)=>{
        if (response.ok){
            return response.json(); 
        }
    }); 
    return rawFile; 
}