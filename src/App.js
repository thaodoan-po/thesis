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
    this.authListener();
  }

  authListener() {
    app.auth().onAuthStateChanged((user) => {
      console.log(user);
      let tmp = user.email
      let reg = /(\w+)@\w+.\w+/gim;
      var temp = reg.exec(tmp);
      this.setState({
        email: temp[1]
      })
      console.log(temp[1]);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
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