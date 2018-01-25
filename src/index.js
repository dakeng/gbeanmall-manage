import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
//import './index.css';
import Admin from './page/Admin/Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path='/admin' component={Admin} />
        </Switch>
    </Router>
    , document.getElementById('root')
);