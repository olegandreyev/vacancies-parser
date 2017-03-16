/**
 * Created by Olejka on 16.03.2017.
 */

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FlatButton, RaisedButton, FontIcon } from 'material-ui'
import { red500 } from 'material-ui/styles/colors'
import { renderTextField } from 'helpers'
import validate from './validateForm'

@reduxForm({
    form:"registerForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})
class RegisterPage3 extends React.Component {
    render(){
        const { handleSubmit, prevPage, error } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <p>
                    Please fill your private information!
                </p>
                <div>
                    <Field name="firstName" component={renderTextField} label="First Name"/>
                    <br/>
                    <Field name="lastName" component={renderTextField} label="Last Name"/>
                </div>
                <div className="register-form-btns" >
                    <FlatButton label="Back" onTouchTap={prevPage} />
                    <RaisedButton onTouchTap={handleSubmit} label="Finish" primary={true} />
                </div>
                <div className="register-form-errors" style={{color:red500}}>
                    {error && <strong>
                        <FontIcon style={{fontSize:18}}
                                  color={red500}
                                  className="fa fa-exclamation-circle"/>
                          <span style={{marginLeft:5}}>{error}</span>
                        </strong>}
                </div>
            </form>
        )
    }
}

export default RegisterPage3