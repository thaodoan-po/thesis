import React, { Component } from 'react';
import { db } from '../firebase';
import {Pie} from 'react-chartjs-2';


export default class Piechart extends Component {
    constructor(props){
        super(props);
        this.state = {
            labels: ['Used', 'Free'],
            datasets: [
            {
                backgroundColor: ['#4e73df', '#ced4da'],
                hoverBackgroundColor: ['#2e59d9', '#bbbdc5'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
                data: []
            }
        ]
                };
        }
    getDisk = () => {
        let ref = db.ref('monitor/users/001/domain/001/disk');
        ref.on('value', snapshot => {
            var used = snapshot.child('used').val();
            var remain = snapshot.child('remain').val();
            this.setState({
                datasets:[
                    {
                        ...this.state.datasets[0],
                        data: [used, remain],
                    },
                ],
            })
            console.log(used, remain);
        });
        console.log('DATA RETRIEVED');
    }
    componentDidMount() {
        this.getDisk();
    }
    render() {
//        console.log(this.state.dataset.data);
        return (

                <div className="card shadow mb-4">
                
                    {/* Card Header */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">{this.props.title}</h6>
                    </div>
                    {/* Card Body */}
                    <div className="card-body">
                        <div className="chart-pie pt-4">
                        <Pie
                        data={this.state}
                        options={{
                            maintainAspectRatio: false,
                            cutoutPercentage: 40,
                            tooltips: {
                                backgroundColor: "rgb(255,255,255)",
                                bodyFontColor: "#858796",
                                borderColor: '#dddfeb',
                                borderWidth: 1,
                                xPadding: 15,
                                yPadding: 15,
                                displayColors: false,
                                caretPadding: 10,
                              },
                            legend: {
                                display: false
                              }
                        }}
                    />
                        </div>
                        <hr></hr>
                        <div className="mt-4 float-center small">
                            <span className="mr-2">
                                <i className="fas fa-circle text-primary"></i> Used:
                            </span>
                            <span className="mr-2">
                               {this.state.datasets[0].data[0]} GB
                            </span>
                            <span className="mr-2">
                                <i className="fas fa-circle text-lightest"></i> Free:
                            </span>
                            <span className="mr-2">
                               {this.state.datasets[0].data[1]} GB
                            </span>
                        </div>
                    </div>
                </div>
                
        );
    }
}