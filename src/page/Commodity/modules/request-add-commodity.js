import FetchUtil from './../../../utils/fetch-util';

import modalSignals from './modal-signals';

let requestAddCommodity = function(data, callback){
    let postData = {};
    postData.commodity_name = data.commodityName;
    postData.commodity_price = data.commodityPrice;
    postData.commodity_specification = data.commoditySpecification;
    postData = JSON.stringify(postData);
    let config = {
        url: '/commodity',
        body: postData,
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
            response.json().then(data => {
                console.log(data);
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
            })
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