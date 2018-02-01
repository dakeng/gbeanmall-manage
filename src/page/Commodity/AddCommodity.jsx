//import { Modal, Button } from 'antd';
import React from 'react';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';

import modalSignals from './modules/modal-signals';
import CommodityForm from './CommodityForm';

export default class AddCommodity extends React.Component {

    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
        this.setState({
            visible: false,
            confirmLoading: false,
        });
        }, 2000);
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
            <Modal title="Title"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            >
            <p>{ModalText}</p>
            <CommodityForm />
            </Modal>
        );
    }
}
