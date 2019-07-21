import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Feedback from '../Feedback/Feedback';


export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(e) {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <Header />
                <Feedback history={this.props.history} />

            </div>

        );
    }
}
