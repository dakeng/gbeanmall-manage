import './styles/index.css';
import React from 'react';
import Table from 'antd/lib/table';
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
//import { Tabel, Icon, Divider } from 'antd';

import request from './modules/request';

const FormItem = Form.Item;
const Column = Table;
const columns = [
    {
        title: 'id',
        dataIndex: '_id',
        key: 'id'
    },
    {
        title: '任务名称',
        dataIndex: 'task_name',
        key: 'name'
    },
    {
        title: '任务奖励',
        dataIndex: 'task_reward',
        key: 'reward'
    },
    {
        title: '描述',
        dataIndex: 'task_des',
        key: 'description'
    },
    {
        title: '页面',
        dataIndex: 'task_screen',
        key: 'screen'
    },
];

export default class CommodityList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            taskName: '',
            taskReward: null,
            taskDes: '',
            taskScreen: '',
            tip: '',
        }
    }

    add = () => {
        if(this.state.taskName.replace(/\s/g, '') === ''){
            this.setState({
                tip: '请输入任务名称'
            })
            return;
        }else if(!this.state.taskReward){
            this.setState({
                tip: '请设置任务奖励'
            })
            return;
        }
        this.setState({
            loading: true
        })
        request({
            method: 'POST',
            operate: 1,
            data: {
                task_name: this.state.taskName,//任务名称
                task_reward: this.state.taskReward,//任务奖励
                task_des: this.state.taskDes,//任务描述
                task_screen: this.state.taskScreen,//任务跳转页面
            }
        }, this.loadData)
    }

    delete = (id) => {
        this.setState({
            loading: true
        })
        request({
            method: 'POST',
            operate: 2,
            data: {
                _id: id
            }
        }, this.loadData)
    }

    loadData = () => {
        this.setState({
            taskName: '',
            taskReward: null,
            taskDes: '',
            taskScreen: '',
            loading: true
        })
        request({
            method: 'GET',
        }, (data) => {
            //console.log(data);
            this.setState({
                dataSource: data,
                loading: false
            })
        })
    }

    componentDidMount(){
        this.loadData();
    }

    render (){
        //console.log(this.state.dataSource);
        return (
            <div className="content-container">
                <h2>任务管理</h2>
                <Divider />
                <div className="btn-container">
                    <p>{this.state.tip}</p>
                    <Form layout='inline'>
                        <FormItem label="任务名称" className='form-item'>
                            <Input placeholder="name" value={this.state.taskName} onChange={e => this.setState({taskName: e.target.value})}/>
                        </FormItem>
                        <FormItem label="任务奖励" className='form-item'>
                            <Input placeholder="reward" type="number" value={this.state.taskReward} onChange={e => this.setState({taskReward: e.target.value})}/>
                        </FormItem>
                        <FormItem label="任务描述" className='form-item'>
                            <Input placeholder="des" value={this.state.taskDes} onChange={e => this.setState({taskDes: e.target.value})}/>
                        </FormItem>
                        <FormItem label="任务跳转页面" className='form-item'>
                            <Input placeholder="screen" value={this.state.taskScreen} onChange={e => this.setState({taskScreen: e.target.value})}/>
                        </FormItem>
                        <FormItem className='form-item'>
                            <Button onClick={(e) => {this.add()}}><Icon type="plus" />新增</Button>
                        </FormItem>
                    </Form>
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
                            //console.log(item);
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
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                                { 
                                    <Divider type="vertical" />
                                }
                                <Button onClick={(e) => this.delete(record._id)}>删除</Button>
                            </span>
                        )}
                    />
                </Table>
            </div>
        );
    }
}