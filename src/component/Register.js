import React, { Component } from 'react';
import { db, app } from '../firebase';
export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordComfirm: ''
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordComfirm = this.handleChangePasswordComfirm(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleChangePasswordComfirm = (event) => {
        this.setState({
            passwordComfirm: event.target.value
        })
    }
    handleSubmit(event) {
        event.app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            })
            .then((user) => {
                console.log(user);
            });
        event.preventDefault();
    }
    sendEmailVerification() {
        // [START sendemailverification]
        app.auth().currentUser.sendEmailVerification().then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          alert('Email Verification Sent!');
          // [END_EXCLUDE]
        });
        // [END sendemailverification]
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
                                        <h1 className="h4 text-gray-900 mb-4">Create an account</h1>
                                    </div>
                                    <form className="user" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user" value={this.state.email} placeholder="Email Address" onChange={this.handleChangeEmail} />
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password" className="form-control form-control-user" value={this.state.password} placeholder="Password" onChange={this.handleChangePassword} />
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="password" className="form-control form-control-user" value={this.state.passwordComfirm} placeholder="Repeat Password" onChange={this.handleChangePasswordComfirm} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-user btn-block" onClick={this.sendEmailVerification}>Register Account</button>
                                        <button type="submit" className="btn btn-danger btn-user btn-block" onClick={this.handleLogin}>Register with Google Account</button>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <a className="small" href="login.html">Already have an account? Login!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}