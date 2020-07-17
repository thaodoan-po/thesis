import React, { Component } from 'react';

export default class Pageheading extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="card shadow mb-4">
                <div className="card shadow h-100 py-2 border-left-danger">
                <div className="card-body">
                <h5 class="text-left card-title font-weight-bold text-primary">Server Information</h5>
                <p className="text-left card-text">Architecture: x86_64</p>
                <p className="text-left card-text">CPU (s): 2</p>
                <p className="text-left card-text">Thread (s) per core: 1</p>
                <p className="text-left card-text">Core (s) per socket: 2</p>
                <p className="text-left card-text">Socket (s): 1</p>
                </div>
                </div>
            </div>
        );
    }
}