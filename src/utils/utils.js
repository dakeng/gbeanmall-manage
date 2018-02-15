const utils = {
    isNull(data){
        if(data === 0){
            return false
        }
        if(data instanceof Array){
            return data.length === 0;
        }
        return !data || data === null || data === undefined;
    }
}

export default utils;