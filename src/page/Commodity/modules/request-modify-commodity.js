import FetchUtil from './../../../utils/fetch-util';

import modalSignals from './modal-signals';

let requestModifyCommodity = function(data, callback){
    let postData = {};
    postData.operate = 4;
    postData._id = data.id;
    postData.data = {
        commodity_name: data.commodityName,
        commodity_imgs: data.commodityImgs,
        commodity_price: data.commodityPrice,
        commodity_specification: data.commoditySpecification
    }
    console.log(postData);
    postData = JSON.stringify(postData);
    let config = {
        url: '/commodity',
        body: postData,
    };

    modalSignals.showModifyModal.dispatch({
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
                    if(data.status === 1){
                        modalSignals.showModifyModal.dispatch({
                            visible: true, 
                            confirmLoading: false, 
                            ModalText: '修改成功'
                        });
                        callback();
                    }else{
                        let text = data.msg || data.data.name;
                        modalSignals.showModifyModal.dispatch({
                            visible: true, 
                            confirmLoading: false, 
                            ModalText: text
                        });
                    }
                })
            }
        }).catch(err => {
            modalSignals.showModifyModal.dispatch({
                visible: true, 
                confirmLoading: false, 
                ModalText: err.msg
            });
            console.log(err.msg);
        })
}

export default requestModifyCommodity;