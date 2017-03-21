/**
 * Created by Olejka on 16.03.2017.
 */

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FlatButton, RaisedButton } from 'material-ui'
import { renderTextField } from 'helpers'
import validate from './validateForm'
import axios from 'axios'

const isUniqueEmail = (values) => {
    return axios.post("/isUniqueEmail", {email:values.email})
        .then(result => {
            if(result.data){
                throw {email:"Already Exists!"}
            }
        }, err => {
            throw {email:"Unknown Error!"}
        })
};

@reduxForm({
    form:"registerForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    asyncValidate: isUniqueEmail,
    asyncBlurFields: [ 'email' ],
    validate
})
class RegisterPage1 extends React.Component {
    render(){
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <p>
                    Please use a real email address, It's required if you want to reset your password!
                </p>
                <div>
                    <Field name="email" component={renderTextField} label="Email"/>
                </div>
                <div className="register-form-btns">
                    <FlatButton  label="Back" disabled={true} />
                    <RaisedButton onTouchTap={handleSubmit} label="Next" primary={true} />
                </div>
            </form>
        )
    }
}

export default RegisterPage1