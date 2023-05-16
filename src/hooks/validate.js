

export default function useValidate() {
    function validateContent(page) {
        let validateStatus = true;
        if (!page.blocks.length > 0) {
            validateStatus = false;
        }

        return validateStatus;
    }
    /* eslint-disable no-unused-vars */
    function processContent(page) {
        if (validateContent(page)) {
            let contentstring = JSON.stringify(page, replacer, 2)

            return contentstring;
        }


        function replacer(key, value) {
            if (key === 'uid') {
                return undefined;
            }
            else if (key === 'modified') {
                return undefined;
            }else if (key === 'status'){
                return undefined;
            }
            else{
                return value; 
            }
        }
    }


    return {
        validateContent,
        processContent,
    }



}

