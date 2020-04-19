import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="sticky-footer bg-gray-800">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span className="text-gray-100">Copyright © Thao Doan 2020</span>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}