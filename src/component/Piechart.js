import React, { Component } from 'react';

export default class Piechart extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (

                <div className="card shadow mb-4">
                
                    {/* Card Header */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">{this.props.title}</h6>
                    </div>
                    
                    {/* Card Body */}
                    <div className="card-body">
                        <div className="chart-pie pt-4 pb-2">
                            <canvas id="myPieChart" />
                        </div>
                        <div className="mt-4 text-center small">
                            <span className="mr-2">
                            <   i className="fas fa-circle text-primary" /> Direct
                            </span>
                            <span className="mr-2">
                                <i className="fas fa-circle text-success" /> Social
                            </span>
                            <span className="mr-2">
                                <i className="fas fa-circle text-info" /> Referral
                            </span>
                        </div>
                    </div>
                </div>
                
        );
    }
}