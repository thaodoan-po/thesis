import React, { Component } from 'react';
import './App.css';
import Home from './component/Home';
import {app} from './firebase';
import Login from './component/Login';
class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
      auth: null
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    let auth = app.auth()
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        console.log(user);
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
    this.setState({
      auth: auth 
    })
  }
  render(){
    return (
      <div className="App">
        {this.state.user ? ( <Home/>) : (<Login  auth={this.state.auth}/>)}
      </div>
    );
  }
}

export default App;
