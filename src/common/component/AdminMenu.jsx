import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
//import {Menu, Icon} from 'antd';
import menus from './../modules/menus';

export default class AdminMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url: '/admin'
        }
    }

    render (){
        return (
            <div>
                <Menu
                    selectedKeys={[this.props.url]}
                    mode="inline"
                    theme="dark"
                    onClick={({key}) => {
                        this.props.history.push(`/admin${key}`);
                        this.setState({
                            url: key
                        })
                    }}
                >
                    {
                        menus.map((item, index) => {
                            return (
                                <Menu.Item key={item.url} style={{fontSize: '16px'}}>
                                    <Icon type={item.iconType} />
                                    <span>{item.name}</span>
                                </Menu.Item>
                            );
                        })
                    }
                </Menu>
            </div>
        );
    }
}