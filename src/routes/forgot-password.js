/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { ForgotPasswordForm } from 'components'
import {SubmissionError} from 'redux-form'
import { client }  from 'helpers'

export default class Login extends React.Component {
    componentDidMount() {

    }

    onSubmitForm = (values) => {
        return client.post("/forgot", values)
            .then(response => {

            }).catch(err => {
                const status = err.response.status;
                if (status === 401) {
                    throw new SubmissionError({_error: "Пользователь с таки Email не существует."})
                } else if(status === 403) {
                    throw new SubmissionError({_error: err.response.data.error})
                } else {
                    throw new SubmissionError({_error: "Неизвестная ошибка!"})
                }
            })
    };

    render() {
        return (
            <div className="forgot-form-wrapper">
                <ForgotPasswordForm onSubmit={this.onSubmitForm}/>
            </div>
        )
    }
}