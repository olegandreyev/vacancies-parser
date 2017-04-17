/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { ResetPasswordForm } from 'components'
import {SubmissionError} from 'redux-form'
import { client }  from 'helpers'
import {Link} from 'react-router'

export default class ResetPassword extends React.Component {
    state = {
        successMessage:null
    };
    onSubmitForm = (values) => {
        values.resetPasswordToken = this.props.params.token;
        return client.post("/resetPassword", values)
            .then(response => {
                this.setState({successMessage:"Пароль успешно изменен"})
            }).catch(err => {
                const status = err.response.status;
                if (status === 400) {
                    throw new SubmissionError({_error: "Некорретный токен!"})
                } else {
                    throw new SubmissionError({_error: "Неизвестная ошибка!"})
                }
            })
    };

    render() {
        return (
            <div className="reset-form-wrapper">
                <ResetPasswordForm onSubmit={this.onSubmitForm}/>
                {this.state.successMessage && <div>
                    <span>{this.state.successMessage}</span>
                    <br/>
                    <Link to="/login"> Вход </Link>
                </div>}
            </div>
        )
    }
}