import React, { Component } from 'react';
import Line from 'react-chartjs-2';

export default class Linechart extends Component {

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
                        <div className="chart-area">
                            <canvas id="myAreaChart" />
                        </div>
                    </div>
                </div>
            

        );
    }

}