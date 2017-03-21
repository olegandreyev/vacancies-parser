/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { connect } from 'react-redux'
import { LoginForm } from 'components'
import { replace } from 'react-router-redux'

@connect(null, {
    redirect:replace
})
export default class Login extends React.Component {
    state = {
        verifyStatus:null
    };
    componentDidMount(){
        const { location:{ query }, redirect } = this.props;
        const { emailConfirmStatus } = query;
        if(emailConfirmStatus !== undefined){
            let booleanStatus = emailConfirmStatus === 'true';
            let message = 'Email has been verified, now you can login into your account using your email and password!';
            if(!booleanStatus){
                message = 'Invalid verification token!';
            }
            this.setState({verifyStatus:message});
            redirect("/login")
        }
    }
    render(){
        return (
            <div className="login-form-wrapper">
                <LoginForm/>
                <p className="confirm-message"> {this.state.verifyStatus} </p>
            </div>
        )
    }
}