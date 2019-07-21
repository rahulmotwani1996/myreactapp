import React, { Component } from 'react';
import FeedbackListItem from '../Feedback-list-item/Feedback-list-item';
import './Feedback-list.css';
export default class FeedbackList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: true
        };
    }

    componentDidMount() {
        fetch("http://localhost:9000/getAllFeedbacks")
            .then(response => response.json())
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({ users: res, isLoading: !this.state.isLoading });

            });
    }


    render() {

        if (this.state.isLoading) {
            return <div>Data Loading....</div>
        } else {
            return (
                <div className="feedback-main-container">
                    <ul className="feedback-list">
                        {
                            this.state.users.map((user, index) => {
                                return <li key={index}><FeedbackListItem user={user} /></li>
                            })
                        }
                    </ul>
                </div>
            )
        }

    }
}