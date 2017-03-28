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
        const {handleSubmit, error} = this.props;
        return (
            <Card className="login-form">
                <CardHeader
                    title="Login"
                    titleColor="white"
                    style={{backgroundColor: deepPurple600}}
                    titleStyle={{fontSize: 21}}
                />
                <CardText style={{paddingTop: 0}}>
                    <form onSubmit={handleSubmit}>
                        <Field fullWidth={true} name="email" component={renderTextField} label="Email"/>
                        <br/>
                        <Field fullWidth={true} name="password" type="password" component={renderTextField} label="Password"/>
                    </form>
                    <div style={{textAlign:'center',color:red500}}>
                        {error && <strong>{error}</strong>}
                    </div>
                </CardText>
                <CardActions style={{textAlign: 'right'}}>
                    <RaisedButton onClick={handleSubmit} label="Login" secondary={true}/>
                </CardActions>
                <Divider/>
                <CardActions className="login-form-another-actions" style={{padding: 12}}>
                    <span className="mute-color">Forgot Your Password?</span>
                    <Link to="register"><span className="mute-color no-underline">Register</span></Link>
                </CardActions>
            </Card>
        )
    }
}