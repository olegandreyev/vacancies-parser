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
                throw {email:"Пользователь с таки адресом уже существует."}
            }
        }, err => {
            throw {email:"Неизвестная ошибка"}
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
                    Пожалуйста используйте настоящий Email адрес, после регистрации вам должна прийти ссылка на подтверждение
                </p>
                <div>
                    <Field name="email" component={renderTextField} label="Email"/>
                </div>
                <div className="register-form-btns">
                    <FlatButton  label="Назад" disabled={true} />
                    <RaisedButton onTouchTap={handleSubmit} label="Далее" primary={true} />
                </div>
            </form>
        )
    }
}

export default RegisterPage1