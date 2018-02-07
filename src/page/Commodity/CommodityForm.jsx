import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
//import Select from 'antd/lib/select';
const FormItem = Form.Item;

export default class CommodityForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
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

    render (){
        return (
            <Form layout="inline">
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
        );
    }
}