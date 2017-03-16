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
                    Please use password with different letter case and numbers!
                </p>
                <div>
                    <Field name="password" component={renderTextField} label="Password"/>
                    <br/>
                    <Field name="repeatPassword" component={renderTextField} label="Repeat Password"/>
                </div>
                <div  className="register-form-btns">
                    <FlatButton label="Back" onTouchTap={prevPage} />
                    <RaisedButton onTouchTap={handleSubmit} label="Next" primary={true} />
                </div>
            </form>
        )
    }
}

export default RegisterPage2