/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react'
import {Card, CardHeader, CardText, RaisedButton, CardActions, TextField, Divider} from 'material-ui';
import {deepPurple600, red500} from 'material-ui/styles/colors'
import {Link} from 'react-router'
import {reduxForm, Field} from 'redux-form'
import {renderTextField} from 'helpers'

@reduxForm({
    form: "login",
    validate:function(values){
        const errors = {};
        if(!values.email){
            errors.email = 'Required!'
        }
        if(!values.password){
            errors.password = 'Required!'
        }
        return errors;
    }
})
export default class LoginForm extends React.Component {
    render() {
        const {handleSubmit, error, submitting} = this.props;
        return (
            <Card className="login-form">
                <CardHeader
                    title="Вход"
                    titleColor="white"
                    style={{backgroundColor: deepPurple600}}
                    titleStyle={{fontSize: 21}}
                />
                <CardText style={{paddingTop: 0}}>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <Field fullWidth={true} name="email" component={renderTextField} label="Email"/>
                        <br/>
                        <Field fullWidth={true} name="password" type="password" component={renderTextField} label="Пароль"/>
                    </form>
                    <div style={{textAlign:'center',color:red500}}>
                        {error && <strong>{error}</strong>}
                    </div>
                </CardText>
                <CardActions style={{textAlign: 'right'}}>
                    <RaisedButton type="submit" form="loginForm" disabled={submitting} onClick={handleSubmit} label="Вход" secondary={true}/>
                </CardActions>
                <Divider/>
                <CardActions className="login-form-another-actions" style={{padding: 12}}>
                    <Link to="forgot-password" className="mute-color no-underline">Забыли свой пароль?</Link>
                    <Link to="register"><span className="">Регистрация</span></Link>
                </CardActions>
            </Card>
        )
    }
}