import FetchUtil from './../../../utils/fetch-util';

let requestDeleteCommodity = function(id, callback){
    let postData = {};
    postData.operate = 2;
    postData._id = id;
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
                    console.log(data);
                    if(data.status === 1){
                        callback && callback();
                    }else{
                        window.alert(data.data.msg);
                    }
                })
            }
        }).catch(err => {
            console.log(err.msg);
        })
}

export default requestDeleteCommodity;