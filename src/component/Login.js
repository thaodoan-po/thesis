import React, { Component } from 'react';
import {app} from '../firebase';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  handleLogin =(event) => {
    event.preventDefault();
    app.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
      console.log(user)
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* Nested Row within Card Body */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" />
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Login</h1>
                  </div>
                  <form className="user" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-user" value={this.state.email} placeholder="Email Address" onChange={this.handleChangeEmail} />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-user" value={this.state.password} placeholder="Password" onChange={this.handleChangePassword} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block" onClick={this.handleLogin}>Login</button>
                    <button type="submit" className="btn btn-danger btn-user btn-block" onClick={this.handleLogin}>Login with Google </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <a className="small" href="login.html"> Forget Password?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}