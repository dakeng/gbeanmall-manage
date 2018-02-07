import FetchUtil from './../../../utils/fetch-util';

let requestCommodityList = function(filter = {}){
    let postData = JSON.stringify(data);
    let requestUrl = '';
    let config = {
        url: '/commodity',
        body: postData,
        method: 'GET'
    };

    modalSignals.showAddCommodity.dispatch({
        visible: true, 
        confirmLoading: true
    });

    new FetchUtil(config)
        .then(response => {
            if(response.status >= 400){
                throw new Error('Bad response from server');
            }
        }).then(data => {
            modalSignals.showAddCommodity.dispatch({
                visible: true, 
                confirmLoading: false, 
                ModalText: '录入成功'
            });
            callback();
            setTimeout(function(){
                modalSignals.showAddCommodity.dispatch({
                    visible: false
                })
            }, 2000)
        }).catch(err => {
            modalSignals.showAddCommodity.dispatch({
                visible: true, 
                confirmLoading: false, 
                ModalText: err.msg
            });
            console.log(err.msg);
        })
}

export default requestAddCommodity;