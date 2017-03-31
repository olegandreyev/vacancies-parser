/**
 * Created by Olejka on 16.03.2017.
 */

import React from 'react';
import {RegisterFormWizard} from 'components'
import { client }  from 'helpers'
import { SubmissionError } from 'redux-form'

class Register extends React.Component {
    submitRegisterForm = (values) =>  {
        return client.post('/register', values)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                const data = error.response.data;
                if (data.error) {
                    throw new SubmissionError({_error:data.error})
                }
            })
    };

    render() {
        return (
            <div className="register-form-wrapper">
                <RegisterFormWizard onSubmit={this.submitRegisterForm}/>
            </div>
        )
    }
}

export default Register