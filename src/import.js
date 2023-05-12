import store from './store/index'

export async function loadNeptuneRepo(branchName) {
  let updatedRepo = {}
  updatedRepo.workset = store.getters.pageDirectory['workset'];

  if (!branchName) {
    branchName = 'master'
  }
  let filenames = await getFilenames(branchName);

  if (filenames.length === 0) {
    store.state.alerts.push({
      type: 'alert-danger',
      message: 'Could not load files'
    })
    return;
  }

  filenames = filenames.filter((name)=>!name.includes("archive")); 
  filenames=filenames.filter((name)=>{
    return name.includes("en__") || name.includes("es__")||name.includes("es_mx__")
  })

  for (let filename of filenames){
      updatedRepo[filename]={}
  }

  // for (let filename of filenames) {
  //   if (!store.state.pageDirectory[filename]) {
  //     updatedRepo[filename] = await getRawFile(filename, branchName)
  //   }
  //   else {
  //     updatedRepo[filename] = store.getters.pageDirectory[filename];
  //   }
  // }
  store.state.pageDirectory = updatedRepo;

  // for(let key of Object.keys(store.getters.pageDirectory)){
  //   if (!filenames.includes(key) && key != 'workset'){
  //     delete store.state.pageDirectory[key]; 
  //   }
  // }
  store.state.alerts.push({
    type: 'alert-success',
    message: 'neptune directory is loaded'
  })
  localStorage.setItem('pageDirectory', JSON.stringify(store.state.pageDirectory))
  localStorage.setItem('currentBranch', store.state.currentBranch)

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


export async function getRawFile(filename, branchName) {
  if (!branchName) {
    branchName = 'master'
  }
  let requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/files/content%2Fsrc%2Fraw%2Fpages%2Fcontent_pages%2F${filename}/raw?ref=${branchName}`;

  const rawFile = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      "PRIVATE-TOKEN": "glpat-aKXWYcCDHts39zJPenmS"
    }
  });
  if (rawFile.ok) {
    let data = await rawFile.json();
    return data;
  } else {
    console.log('no data found');
  }
}
export async function updateFile(contentstring, filename, branchInput) {
  // console.log(contentInput, filename, branchInput); 
  let requesturl = `https://gitlab.com/api/v4/projects/31495766/repository/commits/`
  let update = await fetch(requesturl, {
    method: 'POST',
    headers: {
      'PRIVATE-TOKEN': 'glpat-jyMdXVXNnTcsr8_omboM',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      branch: branchInput,
      commit_message: `updates ${filename}`,
      actions: [{
        action: "update",
        file_path: `/content/src/raw/pages/content_pages/${filename}`,
        content: contentstring,
      }
      ]
    })
  })
  if (update.ok) {
    store.state.alerts.push({
      type: 'alert-success',
      message: `Changes successfully commited to ${branchInput}`
    })
  }

}

