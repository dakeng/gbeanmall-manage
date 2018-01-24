import React from 'react';
import {Menu, Icon} from 'antd';
import menus from './../modules/menus';

export default class AdminMenu extends React.Component{
    render (){
        <div>
            <Menu
                selectedKeys={[this.props.url]}
                mode="inline"
                theme="light"
                onClick={({key}) => {
                    this.props.changeUrl(key);
                    this.props.history.push(`/admin${key}`)
                }}
            >
                {
                    menus.map((item, index) => {
                        <Menu.item key={item.url}>
                            <Icon type={item.iconType} />
                            <span>{item.name}</span>
                        </Menu.item>
                    })
                }
            </Menu>
        </div>
    }
}