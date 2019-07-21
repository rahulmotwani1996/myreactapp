import React, { Component } from 'react';
import ReactStars from 'react-stars'
import './StarRating.css';




export default class StarRating extends Component {


    constructor(props) {
        super(props);
        this.ratingChanged = this.ratingChanged.bind(this);


    }

    ratingChanged(newRating) {
        this.props.handleChange(newRating, this.props.id);

    }
    render() {


        return (
            <div className="main-container">
                <div className="cat-name">
                    <p>{this.props.name}</p>
                </div>
                <div className="rating">
                    <ReactStars
                        value={this.props.value}
                        count={5}
                        onChange={this.ratingChanged}
                        size={30}
                        color2={'#ffd700'} />
                </div>


            </div>
        )
    }





}