import FetchUtil from './../../../utils/fetch-util';

import modalSignals from './modal-signals';

let requestAddCommodity = function(data, callback){
    let postData = {};
    postData.operate = 1;
    postData.data = {
        commodity_name: data.commodityName,
        commodity_imgs: data.commodityImgs,
        commodity_price: data.commodityPrice,
        commodity_specification: data.commoditySpecification
    }
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
            }else{
                response.json().then(data => {
                    console.log(data);
                    modalSignals.showAddCommodity.dispatch({
                        visible: false, 
                        confirmLoading: false, 
                        ModalText: '录入成功'
                    });
                    callback();
                })
            }
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