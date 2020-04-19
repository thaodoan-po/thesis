import React, { Component } from 'react';

export default class Card extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className={"card shadow h-100 py-2 border-left-" + this.props.color}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">                                
                            <div className="col mr-2 text-left">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{this.props.title}</div>
                                <div className="h2 mb-0 font-weight-bold text-gray-800">{this.props.num}</div>
                            </div>
                            <div className="col-auto">
                                <i className={"fas fa-2x text-gray-300 fa-"+ this.props.icon} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}