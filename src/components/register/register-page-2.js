/**
 * Created by Olejka on 16.03.2017.
 */

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FlatButton, RaisedButton } from 'material-ui'
import { renderTextField } from 'helpers'
import validate from './validateForm'

@reduxForm({
    form:"registerForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})
class RegisterPage2 extends React.Component {
    render(){
        const { handleSubmit, prevPage } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <p>
                    Пожалуйста используйте пароль с буквами разного регистра и цифрами.
                </p>
                <div>
                    <Field type="password" name="password" component={renderTextField} label="Пароль"/>
                    <br/>
                    <Field type="password" name="repeatPassword" component={renderTextField} label="Подтверждение пароля"/>
                </div>
                <div  className="register-form-btns">
                    <FlatButton label="Назад" onTouchTap={prevPage} />
                    <RaisedButton onTouchTap={handleSubmit} label="Далее" primary={true} />
                </div>
            </form>
        )
    }
}

export default RegisterPage2