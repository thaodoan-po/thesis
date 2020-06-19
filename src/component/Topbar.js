import React, { Component } from 'react';
import Userinfo from './Userinfo';
import Notification from './Notification';
import Search from './Search';

export default class Topbar extends Component {
    render() {
        return (
            <div>
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* <Search/> */}
                {/* <img src='%PUBLIC%URL%/../logo.png' alt="logo" /> */}
                <ul className="navbar-nav ml-auto" />
                {/* <Notification/> */}
                <div className="topbar-divider d-none d-sm-block" />
                <Userinfo/>
               </nav>
            </div>
        );
    }
}