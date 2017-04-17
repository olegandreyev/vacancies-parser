/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { ForgotPasswordForm } from 'components'
import {SubmissionError} from 'redux-form'
import { client }  from 'helpers'

export default class ForgotPassword extends React.Component {
    state = {
        successMessage:null
    };
    onSubmitForm = (values) => {
        return client.post("/forgot", values)
            .then(response => {
                this.setState({successMessage:"Ссылка на изменение пароля была выслана на ваш Email адрес"})
            }).catch(err => {
                const status = err.response.status;
                if (status === 404) {
                    throw new SubmissionError({_error: "Пользователь с таким Email адресом не существует."})
                } else  {
                    throw new SubmissionError({_error: "Неизвестная ошибка!"})
                }
            })
    };

    render() {
        return (
            <div className="forgot-form-wrapper">
                <ForgotPasswordForm onSubmit={this.onSubmitForm}/>
                { this.state.successMessage && <p>{this.state.successMessage}</p> }
            </div>
        )
    }
}