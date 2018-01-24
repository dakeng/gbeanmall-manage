import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './style.css';
import AdminMenu from './../../common/component/AdminMenu';

class Admin extends React.Component{
    render (){
        const { url } = this.props.match;
        return (
            <div>
                {
                    <div>
                        <div>
                            <AdminMenu />
                        </div>
                    </div>
                }
            </div>
        );
    }
}