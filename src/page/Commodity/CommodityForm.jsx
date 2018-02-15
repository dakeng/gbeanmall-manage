import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
//import Select from 'antd/lib/select';
import utils from './../../utils/utils';
const FormItem = Form.Item;

export default class CommodityForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            imgs: null,
            price: null,
            specification: null,
        }
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

    handleChangeImgs = (e, index) => {
        let _imgs = [];
        _imgs[index] = e.target.value;
        this.setState({
            imgs: _imgs
        })
    }

    render (){
        return (
            <Form layout="inline">
                <FormItem label="商品名称">
                    <Input placeholder="name" value={this.state.name} onChange={e => this.handleChangeName(e)}/>
                </FormItem>
                <FormItem label="商品图片">
                    <Input placeholder="imgs" value={this.state.imgs && this.state.imgs[0]} onChange={e => this.handleChangeImgs(e, 0)}/>
                </FormItem>
                {
                    this.state.imgs && !utils.isNull(this.state.imgs) &&
                    this.state.imgs.map((item, index) => {
                        return <img src={item} alt="" key={index} style={{maxWidth: '50%',display: 'block', border: '1px solid #d9d9d9', borderRadius: '4px', margin: '4px auto'}}/>
                    })
                }
                <FormItem label="商品价格">
                    <Input placeholder="price" type="number" value={this.state.price} onChange={e => this.handleChangePrice(e)}/>
                </FormItem>
                <FormItem label="商品规格">
                    <Input placeholder="specification" value={this.state.specification} onChange={e => this.handleChangeSpec(e)}/>
                </FormItem>
            </Form>
        );
    }
}