/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react'
import {Card, CardHeader, CardText, RaisedButton, CardActions, TextField, Divider } from 'material-ui';
import {deepPurple600} from 'material-ui/styles/colors'
import { Link } from 'react-router'

export default class LoginForm extends React.Component {
    render(){
        return (
            <Card className="login-form">
                <CardHeader
                    title="Login"
                    titleColor="white"
                    style={{backgroundColor:deepPurple600}}
                    titleStyle={{fontSize:21}}
                />
                <CardText style={{paddingTop:0}}>
                    <TextField
                        hintText="Username"
                        floatingLabelText="Username"
                        fullWidth={true}
                        />
                    <br/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        fullWidth={true}
                        type="password"/>
                </CardText>
                <CardActions style={{textAlign:'right'}}>
                    <RaisedButton label="Login" secondary={true} />
                </CardActions>
                <Divider/>
                <CardActions className="login-form-another-actions" style={{padding:12}}>
                    <span className="mute-color">Forgot Your Password?</span>
                    <Link to="register"><span className="mute-color no-underline">Register</span></Link>
                </CardActions>
            </Card>
        )
    }
}