import React, { Component } from 'react';
import './Header.css';
import logo from './logo.jpg';
export default class Header extends Component {
    render() {
        return (
            <div className="main_container">
                <div className="tilt_div"></div>
                <div className="hotel-det">
                    <div className="hotel-logo">
                        <img className="logo" src={logo} />
                    </div>
                    <div className="hotel-name">
                        <p>Hotel Voyage</p>


                        <p style={{ fontSize: 0.5 + 'em', color: 'yellow', float: 'right' }}>We create memories...</p>
                    </div>

                </div>



            </div>
        )
    }
}