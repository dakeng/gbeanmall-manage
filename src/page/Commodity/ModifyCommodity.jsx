//import { Modal, Button } from 'antd';
import React from 'react';
import Modal from 'antd/lib/modal';
//import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
//import Select from 'antd/lib/select';

import modalSignals from './modules/modal-signals';
import requestModifyCommodity from './modules/request-modify-commodity';

const FormItem = Form.Item;

export default class ModityCommodity extends React.Component {

    state = {
        ModalText: '修改',
        visible: false,
        confirmLoading: false,
    }

    showModifyModal = (config) => {
        //console.log(config);
        this.setState(()=>{return config});
    }

    handleChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleChangePrice = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    handleChangeSpec = (e) => {
        this.setState({
            specification: e.target.value
        })
    }

    handleOk = () => {
        let data = {
            id: this.state.id,
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
                ModalText: '修改中...',
                confirmLoading: true,
            });
            requestModifyCommodity(data, this.props.loadData);
        }
    }

    handleCancel = () => {
        //console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
        //this.clearForm();
    }

    componentDidMount() {
        modalSignals.showModifyModal.add(this.showModifyModal);
    }

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <Modal title="商品编辑"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                style={{textAlign: 'center'}}
            >
            <p>{ModalText}</p>
            <Form layout="inline">
                <FormItem label="商品id">
                    <Input placeholder="id" value={this.state.id} disabled={true}/>
                </FormItem>
                <FormItem label="商品名称">
                    <Input placeholder="name" value={this.state.name} onChange={e => this.handleChangeName(e)}/>
                </FormItem>
                <FormItem label="商品价格">
                    <Input placeholder="price" type="number" value={this.state.price} onChange={e => this.handleChangePrice(e)}/>
                </FormItem>
                <FormItem label="商品规格">
                    <Input placeholder="specification" value={this.state.specification} onChange={e => this.handleChangeSpec(e)}/>
                </FormItem>
            </Form>
            </Modal>
        );
    }
}
