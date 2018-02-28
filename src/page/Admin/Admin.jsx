import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './styles/style.css';
import AdminMenu from './../../common/component/AdminMenu';
import AdminIndex from './../../page/AdminIndex/index';

import UserList from './../User/UserList';
import CommodityList from './../Commodity/commodityList';
import TaskList from './../Task/TaskList';

import Layout from 'antd/lib/layout';

const {Header, Sider, Content, Footer} = Layout;

export default class Admin extends React.Component{
    render (){
        const { url } = this.props.match;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                    <div className="logo" />
                    <AdminMenu history={this.props.history} />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}></Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <Switch>
                            <Route exact path={url} component={AdminIndex} />
                            <Route path={`${url}/user`} component={UserList} />
                            <Route path={`${url}/commodity`} component={CommodityList} />
                            <Route path={`${url}/task`} component={TaskList} />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>游戏金豆兑换平台 by Dakeng</Footer>
                </Layout>
            </Layout>
        );
    }
}