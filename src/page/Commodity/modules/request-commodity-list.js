import FetchUtil from './../../../utils/fetch-util';

let requestCommodityList = function(filter = {}, callback){
    //let postData = JSON.stringify(data);
    //let requestUrl = '';
    let config = {
        url: '/commodity',
        method: 'GET'
    };

    new FetchUtil(config)
        .then(response => {
            if(response.status >= 400){
                throw new Error('Bad response from server');
            }else{
                response.json().then(data => {
                    //console.log(data);
                    if(callback){
                        callback(data.data);
                    }
                })
            }
        }).catch(err => {
            console.log(err.msg);
        })
}

export default requestCommodityList;