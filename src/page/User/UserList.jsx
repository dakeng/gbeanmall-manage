import React from 'react';
import Table from 'antd/lib/table';
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
//import './styles/style.css';
//import { Tabel, Icon, Divider } from 'antd';

const dataSource = [
    {
        key: '1',
        userName: 'dakeng',
        userId: '1',
        phoneNum: '13425400000'
    },
    {
        key: '2',
        userName: 'dakeng2',
        userId: '2',
        phoneNum: '13425400000'
    },
    {
        key: '3',
        userName: 'dakeng3',
        userId: '3',
        phoneNum: '13425400000'
    },
    {
        key: '4',
        userName: 'dakeng4',
        userId: '4',
        phoneNum: '13425400000'
    },
    {
        key: '5',
        userName: 'dakeng5',
        userId: '5',
        phoneNum: '13425400000'
    }
]

const columns = [
    {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
    },
    {
        title: '用户id',
        dataIndex: 'userId',
        key: 'userId'
    },
    {
        title: '手机号码',
        dataIndex: 'phoneNum',
        key: 'phoneNum'
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
            return (
                <span>
                    <Button onClick={(e) => {console.log('查看订单')}}>查看订单</Button>
                    <Divider type="vertical" />
                    <Button onClick={(e) => {console.log('已完成任务')}}>已完成任务</Button>
                </span>
            );
        }
    }
]

export default class UserList extends React.Component {
    render (){
        return (
            <div className="content-container">
                <h2>用户管理</h2>
                <Table 
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </div>
        );
    }
}