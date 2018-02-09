import './styles/index.css';
import React from 'react';
import Table from 'antd/lib/table';
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
//import { Tabel, Icon, Divider } from 'antd';

import AddCommodity from './AddCommodity';
import ModalSignals from './modules/modal-signals';
import requestCommodityList from './modules/request-commodity-list';

const columns = [
    {
        title: '货物名称',
        dataIndex: 'commodity_name',
        key: 'name'
    },
    {
        title: '货物图片',
        dataIndex: 'goodImg',
        key: 'goodImg'
    },
    {
        title: '单价',
        dataIndex: 'commodity_price',
        key: 'price'
    },
    {
        title: '规格',
        dataIndex: 'commodity_specification',
        key: 'specification'
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
            return (
                <span>
                    <Button onClick={(e) => {console.log('编辑')}}>编辑</Button>
                    <Divider type="vertical" />
                    <Button onClick={(e) => {console.log('删除')}}>删除</Button>
                </span>
            );
        }
    }
];

export default class CommodityList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
        }
    }
    
    add = () => {
        ModalSignals.showAddCommodity.dispatch({
            visible: true,
            ModalText: '请输入'
        });
    }

    delete = () => {
        
    }

    changeList = (data) => {
        this.setState({
            dataSource: data,
        })
    }

    componentWillMount(){
        requestCommodityList({}, this.changeList);
    }

    render (){
        //console.log(this.state.dataSource);
        return (
            <div className="content-container">
                <h2>商品管理</h2>
                <Divider />
                <div className="btn-container">
                    <Button onClick={(e) => {console.log('编辑')}}><Icon type="search" />查询</Button>
                    <Divider type="vertical" />
                    <Button onClick={(e) => {this.add()}}><Icon type="plus" />新增</Button>
                </div>
                <Divider/>
                <Table 
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                />
                <AddCommodity />
            </div>
        );
    }
}