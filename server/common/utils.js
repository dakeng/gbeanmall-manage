const generateResData = function(data, status = 1){
    let resData = {};
    resData.status = status;
    resData.data = data;
    return resData;
}

export {generateResData};