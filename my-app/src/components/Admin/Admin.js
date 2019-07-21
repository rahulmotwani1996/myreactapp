import React, { Component } from 'react';
import FeedbackList from '../Feedback-list/Feedback-list';
import Chart from '../Chart/Chart';


export default class Admin extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Chart />
                <FeedbackList />

            </div>
        )
    }
}