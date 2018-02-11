import FetchUtil from './../../../utils/fetch-util';

let requestDeleteCommodity = function(data, callback){
    let postData = {};
    postData.operate = 2;
    postData.data = data;
    postData = JSON.stringify(postData);
    let config = {
        url: '/commodity',
        body: postData,
    };

    new FetchUtil(config)
        .then(response => {
            if(response.status >= 400){
                throw new Error('Bad response from server');
            }else{
                response.json().then(data => {
                    //console.log(data);
                    callback && callback();
                })
            }
        }).catch(err => {
            console.log(err.msg);
        })
}

export default requestDeleteCommodity;