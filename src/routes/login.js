/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { connect } from 'react-redux'
import { LoginForm } from 'components'

@connect()
export default class Login extends React.Component {
    render(){
        return (
            <div className="login-form-wrapper">
                <LoginForm/>
            </div>
        )
    }
}