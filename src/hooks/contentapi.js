import {useStore} from 'vuex'; 

export default function useContentApi() {
    const store = useStore(); 

    async function loadContent(page){
        const categories = getCategories(page); 

        const directory = await fetchContentDirectory(categories, page); 

        store.state.contentDirectory = directory; 
        return true; 

    }
    //returns an object mapping categories to content items
    async function fetchContentDirectory(categories, page){
        let contentDirectory = {}; 
        for (let category of categories){
            contentDirectory[category] = await fetchContentCategory(category, page); 
        }
        return contentDirectory; 
    }
    function getCategories(page){
        let blockList = store.state.pageDirectory[page]['blocks'];
        let categories = []; 

        for(let block of blockList){
            if(block.blockType === 'fotoscape_block'){
                let currCat= block['settings']['category']? block['settings']['category']:'standard'
                if(!categories.includes(currCat)) categories.push(currCat); 
            }
        }
        return categories; 
    }
    async function fetchContentCategory(category, page){
        let lang = page['language']
        let requestURL = `https://origin.fotoscapes.com/wp/v1/daily?ckey=fb529d256155b9c6&mp_lang=${lang}&sched=${category}`
        let content = await fetch(requestURL)
        if(content.ok){
            content = await (content.json())
            return content.items;           
        }
    }

    return [
        loadContent
    ]
}