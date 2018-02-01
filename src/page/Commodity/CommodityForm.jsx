import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
const FormItem = Form.Item;

export default class CommodityForm extends React.Component {
    render (){
        return (
            <Form layout="inline">
                <FormItem label="商品名称">
                    <Input placeholder="name"/>
                </FormItem>
                <FormItem label="商品价格">
                    <Input placeholder="price"/>
                </FormItem>
            </Form>
        );
    }
}