import React, { Component } from 'react';
import './Feedback.css';
import StarRating from '../StarRating/StarRating';
import { withRouter } from 'react-router-dom';
export default class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [
                { name: "Food Quality", value: 0 },
                { name: "Cleanliness", value: 0 },
                { name: "Service", value: 0 },
                { name: "Atmosphere", value: 0 },
                { name: "Value For Money", value: 0 },
                { name: "Overall", value: 0 }
            ],
            username: "",
            suggestion: "",
            captcha: "",
            userInputCaptcha: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.getSuggestion = this.getSuggestion.bind(this);
        this.createCaptcha = this.createCaptcha.bind(this);
        this.handleSkip = this.handleSkip.bind(this);



    }

    handleSkip(e) {
        e.preventDefault();
        this.props.history.push('/admin');
    }

    componentDidMount() {
        this.createCaptcha();
    }


    handleChange(newValue, id) {

        var clone = this.state.category.slice(0);
        clone[id].value = newValue;
        this.setState({ category: clone });
        // alert(JSON.stringify(this.state.category))
    }

    handleSubmit(e) {
        e.preventDefault();

        var captcha = this.state.captcha;
        var userInput = this.state.userInputCaptcha;

        if (userInput == "") {
            alert("Please enter the captcha");
        } else if (userInput != captcha) {
            alert("Invalid captcha");
        } else {
            this.sendData();

        }



    }

    sendData() {
        var url = "http://localhost:9000/postFeedback";
        var data = {
            username: this.state.username,
            ratings: {
                food: this.state.category[0].value,
                Cleanliness: this.state.category[1].value,
                Service: this.state.category[2].value,
                Atmosphere: this.state.category[3].value,
                ValueForMoney: this.state.category[4].value,
                Overall: this.state.category[5].value,

            },
            suggestion: this.state.suggestion

        }
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then(response => { this.resetForm(); alert("Feedback Submittted successfully") })
            .catch(error => console.error('Error:', error))

        console.log(JSON.stringify(this.state));

    }
    resetForm() {
        this.setState({
            category: [
                { name: "Food Quality", value: 0 },
                { name: "Cleanliness", value: 0 },
                { name: "Service", value: 0 },
                { name: "Atmosphere", value: 0 },
                { name: "Value For Money", value: 0 },
                { name: "Overall", value: 0 }
            ],
            username: "",
            suggestion: "",
            captcha: "",
            userInputCaptcha: ""
        });
        this.createCaptcha();
    }
    getSuggestion(e) {
        this.setState({
            suggestion: e.target.value
        });
    }
    handleNameChange(e) {
        console.log(e.target.value);
        this.setState({ username: e.target.value });
    }
    createCaptcha() {
        //clear the contents of captcha div first 

        var charsArray =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#";
        var lengthOtp = 6;
        var captcha = [];
        for (var i = 0; i < lengthOtp; i++) {
            //below code will not allow Repetition of Characters
            var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
            if (captcha.indexOf(charsArray[index]) == -1)
                captcha.push(charsArray[index]);
            else i--;
        }


        //storing captcha so that can validate you can save it somewhere else according to your specific requirements
        var code = captcha.join("");

        // adds the canvas to the body element
        this.setState({ captcha: code });



    }
    render() {
        return (
            <div className="main-container">

                <div className="note">
                    <p>
                        We Welcome Your Comments
                        Thank you for giving us an opportunity to be your host in London. We hope you enjoyed your stay with us.
                        Please spare a few moments to complete this Guest Satisfaction form which will help us to improve our
                        service
        </p>
                </div>
                <div id="divider"></div>
                <div className="feedback-form">

                    <form className="example-form" onSubmit={this.handleSubmit}>

                        <input className="input-form" placeholder="Name" value={this.state.username} onChange={this.handleNameChange} />


                        <ul className="cat-list">
                            {
                                this.state.category.map((cat, index) => {
                                    return (
                                        <li><StarRating id={index} name={cat.name} value={cat.value} handleChange={this.handleChange} /></li>
                                    )
                                })
                            }
                        </ul>

                        <textarea placeholder="Leave a comment" name="comment" value={this.state.suggestion} onChange={this.getSuggestion}></textarea>

                        <fieldset>
                            <legend>Captcha</legend>

                            <div className="captcha">
                                {this.state.captcha}
                            </div>

                            <input type="text" placeholder="Type Here..." id="captchaTextBox"
                                value={this.state.userInputCaptcha} onChange={(e) => this.setState({ userInputCaptcha: e.target.value })} />

                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" style={{ width: "100px" }} className="btn btn-primary"
                                value="Refresh" onClick={this.createCaptcha} />
                        </fieldset>
                        <div className="action">
                            <button className="btn btn-warning">
                                Submit
                             </button>
                            <button className="btn btn-danger" onClick={this.handleSkip}>
                                Skip
                             </button>
                        </div>


                    </form>
                </div>
            </div>
        )
    }
}