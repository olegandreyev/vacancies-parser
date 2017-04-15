/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import {connect} from 'react-redux'
import {LoginForm} from 'components'
import {replace} from 'react-router-redux'
import {SubmissionError} from 'redux-form'
import { client }  from 'helpers'
import { authSuccess } from 'actions'

@connect(null, {
    redirect: replace,
    authSuccess
})
export default class Login extends React.Component {
    state = {
        verifyStatus: null
    };

    componentDidMount() {
        const {location:{query}, redirect} = this.props;
        const {emailConfirmStatus} = query;
        if (emailConfirmStatus !== undefined) {
            let booleanStatus = emailConfirmStatus === 'true';
            let message = 'Email адрес был подтвержден, теперь вы можете зайти в систему использую свой логин и пароль.';
            if (!booleanStatus) {
                message = 'Некорректная ссылка подтверждения Email адреса.';
            }
            this.setState({verifyStatus: message});
            redirect("/login")
        }
    }

    onSubmitForm = (values) => {
        const { authSuccess } = this.props;
        return client.post("/auth", values)
            .then(response => {
                authSuccess(response.data)
            }).catch(err => {
                const status = err.response.status;
                if (status === 401) {
                    throw new SubmissionError({_error: "Неверный Email или Пароль!"})
                } else if(status === 403) {
                    throw new SubmissionError({_error: err.response.data.error})
                } else {
                    throw new SubmissionError({_error: "Неизвестная ошибка!"})
                }
            })
    };

    render() {
        return (
            <div className="login-form-wrapper">
                <LoginForm onSubmit={this.onSubmitForm}/>
                <p className="confirm-message"> {this.state.verifyStatus} </p>
            </div>
        )
    }
}