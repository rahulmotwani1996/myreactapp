import React, { Component } from 'react';
import CanvasJSReact from '../../canvasjs.react';
import './Chart.css';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export default class Chart extends Component {

    constructor() {
        super();
        this.state = {
            dataPoints: [
                { label: "Food Quality", y: 5 },
                { label: "Atmosphere", y: 5 },
                { label: "Cleanliness", y: 5 },
                { label: "Services", y: 5 },
                { label: "Value for Money", y: 5 },
                { label: "Overall", y: 5 },


            ]
        }

    }

    componentDidMount() {

        fetch("http://localhost:9000/avgRating", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        })
            .then(response => response.json())
            .then(res => {
                var clone = this.state.dataPoints.splice(0);
                clone[0].y = res.food;
                clone[1].y = res.atmosphere;
                clone[2].y = res.cleanliness;
                clone[3].y = res.service;
                clone[4].y = res.valueForMoney;
                clone[5].y = res.overall;
                this.setState({ dataPoints: clone });
            })

    }



    render() {
        const options = {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Hotel Voyage Feedback Statistic"
            },
            axisY: {
                title: "Average",
                labelFormatter: this.addSymbols,
                scaleBreaks: {
                    autoCalculate: true
                }
            },
            axisX: {
                title: "Feedback Categories",
                labelAngle: 0
            },
            data: [{
                type: "column",
                dataPoints: this.state.dataPoints
            }]
        }

        return (
            <div className="chart-main-container">
                <div className="chart-container">
                    <CanvasJSChart options={options}
                        onRef={ref => this.chart = ref}
                        className="chart" />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            </div>
        );
    }
}