//import { Modal, Button } from 'antd';
import React from 'react';
import Modal from 'antd/lib/modal';
//import Button from 'antd/lib/button';

import modalSignals from './modules/modal-signals';
import CommodityForm from './CommodityForm';
//import fetch from './../../config/fetch';

export default class AddCommodity extends React.Component {

    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }

    showModal = (config) => {
        this.setState(config);
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        /* setTimeout(() => {
        this.setState({
            visible: false,
            confirmLoading: false,
        });
        }, 2000); */
        let data = {
            commodityName: 'ceshi',
            commodityPrice: '50',
            commoditySpecification: '22'
        }
        data = JSON.stringify(data);
        console.log(data);
        let init = {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch('/commodity', init)
            .then(res => res.text())
            .then(
                result => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                    console.log(result);
                },
                error => {
                    this.setState({
                        confirmLoading: false,
                        ModalText: 'failed'
                    });
                    console.log(error);
                }
            )
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
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
            <CommodityForm />
            </Modal>
        );
    }
}
