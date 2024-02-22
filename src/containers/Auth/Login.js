import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }

    handleOnchangeUsername=(event) =>{
        this.setState({
            username: event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async() => {
        this.setState({
            errMessage: ''
        })
        try {
             let data = await handleLoginApi(this.state.username, this.state.password)
                if(data && data.errCode !== 0){
                    this.setState({
                        errMessage: data.message,
                    })
                }
                if(data && data.errCode === 0){
                    this.props.userLoginSuccess(data.user)
                }
            
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                    errMessage: error.response.data.message
                 })
                }
            }
            
        } 
    }

    handleKeyDown = (event) =>{
        if(event.key === "Enter" || event.keyCode === 13){
            this.handleLogin();
        }
    }

    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>
                            Login
                        </div>
                        <div className='col-12 form-group input-login'>
                            <label>User Name:</label>
                            <input type='text' className='form-control' 
                            placeholder='Enter your username...'
                            value={this.state.username}
                            onChange={(event) => {this.handleOnchangeUsername(event)}}
                            ></input>
                        </div>

                        <div className='col-12 form-group input-login'>
                            <label>PassWord:</label>
                            <input type='password'   className='form-control'
                                placeholder='Enter your password...'
                                value={this.state.password}
                                onChange={(event) => {this.handleOnchangePassword(event)}}
                            onKeyDown={(event) => this.handleKeyDown(event)}
                             ></input>                           

                        </div>

                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12 '>
                            <button className='btn-login' onClick={() => {this.handleLogin()}}>Login</button> 
                        </div>
                           
                        <div className='col-12 forgot-login'>
                            <span>Forgot your password?</span>
                        </div>

                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'> Or Login With: </span>
                        </div>

                        <div className='col-12 social-login'>

                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f fb'></i>
                            <i className='fab fa-instagram insta'></i>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
