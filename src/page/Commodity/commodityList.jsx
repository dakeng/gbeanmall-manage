import './styles/index.css';
import React from 'react';
import Table from 'antd/lib/table';
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
//import { Tabel, Icon, Divider } from 'antd';

import AddCommodity from './AddCommodity';
import ModalSignals from './modules/modal-signals';

const dataSource = [
    {
        key: '1',
        goodId: '1',
        goodName: 'dakeng',
        goodImg: '',
        price: '10000',
        specification: '1'
    },
];

const columns = [
    {
        title: '货物id',
        dataIndex: 'goodId',
        key: 'goodId'
    },
    {
        title: '货物名称',
        dataIndex: 'goodName',
        key: 'goodName'
    },
    {
        title: '货物图片',
        dataIndex: 'goodImg',
        key: 'goodImg'
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: '规格',
        dataIndex: 'specification',
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
    //下班回去写
    add(){
        ModalSignals.showAddCommodity.dispatch(true);
    }

    render (){
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
                    dataSource={dataSource}
                    pagination={false}
                />
                <AddCommodity />
            </div>
        );
    }
}