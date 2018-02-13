//import { Modal, Button } from 'antd';
import React from 'react';
import Modal from 'antd/lib/modal';
//import Button from 'antd/lib/button';

import modalSignals from './modules/modal-signals';
import CommodityForm from './CommodityForm';
import requestAddCommodity from './modules/request-add-commodity';

export default class AddCommodity extends React.Component {

    state = {
        ModalText: '请输入',
        visible: false,
        confirmLoading: false,
    }

    showModal = (config) => {
        this.setState(()=>{return config});
    }

    handleOk = () => {
        let data = {
            commodityName: this.state.name,
            commodityPrice: this.state.price,
            commoditySpecification: this.state.specification,
        }
        if(!data.commodityName){
            this.setState({
                ModalText: '商品名称不能为空',
            });
        }else if(!data.commodityPrice){
            this.setState({
                ModalText: '商品价格不能为空',
            });
        }else if(!data.commoditySpecification){
            this.setState({
                ModalText: '商品规格不能为空',
            });
        }else{
            this.setState({
                ModalText: '录入中...',
                confirmLoading: true,
            });
            requestAddCommodity(data, this.clearForm);
        }
    }

    handleCancel = () => {
        //console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
        this.clearForm(false);
    }

    clearForm = (isReload = true) => {
        this.CommodityForm.setState({
            name: null,
            price: null,
            specification: null,
        })
        isReload && this.props.loadData();
    }

    componentDidMount() {
        modalSignals.showAddCommodity.add(this.showModal);
    }

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <Modal title="商品录入"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                style={{textAlign: 'center'}}
            >
            <p>{ModalText}</p>
            <CommodityForm ref={ref => this.CommodityForm = ref}/>
            </Modal>
        );
    }
}
