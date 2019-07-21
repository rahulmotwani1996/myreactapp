import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Main from './components/Main/Main';
import Admin from './components/Admin/Admin';
import Chart from './components/Chart/Chart';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
const routes = (
    <Router>
        <div className="nav-bar-container">
            <ul className="nav-bar">
                <li> <NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/admin" activeClassName="active">Admin</NavLink></li>


            </ul>
        </div>
        <Route exact path="/" component={Main}></Route>
        <Route path="/admin" component={Admin}></Route>

    </Router>
)


ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
