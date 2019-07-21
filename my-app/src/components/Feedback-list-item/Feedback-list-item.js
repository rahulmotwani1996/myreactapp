import React, { Component } from 'react';
import './Feedback-list-item.css'
export default class FeedbackListItem extends Component {

    constructor(props) {
        super(props);
        this.user = this.props.user;

    }

    render() {

        return (
            <div className="card">
                <div className="top">
                    <p id="name">{this.user.username}</p>
                    <p id="date">{this.user.date}</p>
                </div>

                <div className="ratings">

                    <p>Food Quality {this.user.food}</p>

                    <p>Service {this.user.cleanliness}</p>

                    <p>Atmosphere {this.user.service}</p>

                    <p>Cleanliness {this.user.atmosphere}</p>

                    <p>Value for money {this.user.valueForMoney}</p>

                    <p>Overalll {this.user.overall}</p>

                </div>

                <div className="suggestion">

                    <p>{this.user.suggestion}</p>

                </div>
            </div>
        )
    }


}