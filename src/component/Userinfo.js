import React, { Component } from 'react';
import {app} from '../firebase';

export default class Userinfo extends Component {
    logout = () => {
        app.auth().signOut();
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        window.location.reload()
    }
    render() {
        return (
            <div className="nav-item dropdown no-arrow">
                
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Thao Doan</span>
                        <img className="img-profile rounded-circle" src="https://source.unsplash.com/random/60x60" />
                    </a>
                    {/* Dropdown - User Information */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <button className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={this.logout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                            Logout
                        </button>
                    </div>
                
            </div>
        );
    }
}