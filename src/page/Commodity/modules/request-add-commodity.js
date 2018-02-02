import FetchUtil from './../../../utils/fetch-util';

import modalSignals from './modal-signals';

let requestAddCommodity = function(data){
    let postData = JSON.stringify(data);
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
        }).then(data => {
            if(data){
                console.log(data);
                modalSignals.showAddCommodity.dispatch({
                    visible: true, 
                    confirmLoading: false, 
                    ModalText: '成功'
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