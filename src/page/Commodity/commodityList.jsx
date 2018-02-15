import './styles/index.css';
import React from 'react';
import Table from 'antd/lib/table';
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
//import { Tabel, Icon, Divider } from 'antd';

import AddCommodity from './AddCommodity';
import ModityCommodity from './ModifyCommodity';
import ModalSignals from './modules/modal-signals';
import requestCommodityList from './modules/request-commodity-list';
import requestDeleteCommodity from './modules/request-delete-commodity';

const Column = Table;
const columns = [
    {
        title: 'id',
        dataIndex: '_id',
        key: 'id'
    },
    {
        title: '货物名称',
        dataIndex: 'commodity_name',
        key: 'name'
    },
    /* {
        title: '货物图片',
        dataIndex: 'commodity_imgs[0]',
        key: 'imgs'
    }, */
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
    /* {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
            return (
                <span>
                    <Button onClick={(e) => {console.log('编辑')}}>编辑</Button>
                    <Divider type="vertical" />
                    <Button onClick={(e) => this.delete(record._id)}>删除</Button>
                </span>
            );
        }
    } */
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

    delete = (id) => {
        requestDeleteCommodity(id, this.loadData);
    }

    modify = (data) => {
        let config = {
            visible: true
        };
        Object.assign(config, data);
        ModalSignals.showModifyModal.dispatch(config);
    }

    changeList = (data) => {
        this.setState({
            dataSource: data,
            loading: false,
        })
    }

    loadData = () => {
        this.setState({
            loading: true
        })
        requestCommodityList({}, this.changeList);
    }

    componentDidMount(){
        this.loadData();
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
                    rowKey={record => record._id}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    loading={this.state.loading}
                >
                    {
                        columns && columns.map((item, index) => {
                            console.log(item);
                            return (
                                <Column
                                    title={item.title}
                                    key={item.key}
                                    dataIndex={item.dataIndex}
                                />
                            );
                        })
                    }
                    <Column
                        title="商品图片"
                        key="goodImgs"
                        render={(text,record) => (
                            <img src={record.commodity_imgs} alt="" style={{width: '130px'}}/>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <Button 
                                    onClick={(e) => {this.modify({
                                        id: record._id,
                                        name: record.commodity_name,
                                        imgs: record.commodity_imgs,
                                        price: record.commodity_price,
                                        specification: record.commodity_specification,
                                    })}}>
                                    编辑
                                </Button>
                                { 
                                    //<Divider type="vertical" />
                                }
                                <Button onClick={(e) => this.delete(record._id)}>删除</Button>
                            </span>
                        )}
                    />
                </Table>
                <AddCommodity loadData={this.loadData}/>
                <ModityCommodity loadData={this.loadData}/>
            </div>
        );
    }
}