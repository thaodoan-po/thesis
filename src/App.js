import React, { Component } from 'react';
import './App.css';
import Home from './component/Home';
import { app } from './firebase';
import Login from './component/Login';
class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
      email: ''
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    const savedUser = localStorage.getItem('user') || undefined;
    const savedEmail = localStorage.getItem('email') || undefined;
    const emailId = savedEmail ? savedEmail.split('@')[0] : undefined;
    if (savedUser && savedEmail) {
      this.setState({user: savedUser, email: emailId});
    } else {
      this.authListener();
    }
  }

  authListener() {
    app.auth().onAuthStateChanged((user) => {
      let tmp = user.email
      const name = user.email.split('@')[0]
      let reg = /(\w+)@\w+.\w+/gim;
      // var temp = reg.exec(tmp);
      this.setState({
        email: name
      })
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
        localStorage.setItem('email', user.email);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.user ? (<Home user = {this.state.email}/>) : (<Login />)}
      </div>
    );
  }
}

export default App;