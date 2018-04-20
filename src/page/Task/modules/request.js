import FetchUtil from './../../../utils/fetch-util';

let requestAddCommodity = function(data, callback){
    let postData = {};
    postData.operate = data.operate;
    postData.data = data.data;
    postData = JSON.stringify(postData);
    let config = {
        url: '/task',
        body: postData,
        method: data.method,
    };
    new FetchUtil(config)
        .then(response => {
            if(response.status >= 400){
                throw new Error('Bad response from server');
            }else{
                response.json().then(data => {
                    //console.log(data);
                    callback && callback(data.data.data);
                })
            }
        }).catch(err => {
            console.log(err);
        })
}

export default requestAddCommodity;