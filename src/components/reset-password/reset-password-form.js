/**
 * Created by Olejka on 17.04.2017.
 */

import React from 'react';
import { reduxForm, Field } from 'redux-form'
import {Card, CardHeader, CardText, CardActions, RaisedButton} from 'material-ui'
import { renderTextField } from 'helpers'
import {deepPurple600, red500 } from 'material-ui/styles/colors'

@reduxForm({
    form:"resetPassword",
    validate:values => {
        const errors = {};
        if(!values.password){
            errors.password = "Обязательное поле!"
        }
        if(values.password !== values.confirmPassword){
            errors.confirmPassword = "Пароли должны совпадать!"
        }
        return errors;
    }
})
export default class ResetPasswordForm extends React.Component {
    render(){
        const { handleSubmit, submitting, error } = this.props;
        return (
            <Card className="forgot-password-form">
                <CardHeader
                    title="Новый пароль"
                    titleColor="white"
                    style={{backgroundColor: deepPurple600}}
                    titleStyle={{fontSize: 21}}
                />
                <CardText style={{paddingTop: 0}}>
                    <form id="resetPassword" onSubmit={handleSubmit}>
                        <Field type="password" fullWidth={true} name="password" component={renderTextField} label="New Password"/>
                        <br/>
                        <Field type="password" fullWidth={true} name="confirmPassword" component={renderTextField} label="Repeat Password"/>
                    </form>
                </CardText>
                <CardActions style={{textAlign: 'right'}}>
                    <div style={{textAlign:'center',color:red500}}>
                        {error && <strong>{error}</strong>}
                    </div>
                    <RaisedButton type="submit"
                                  form="resetPassword"
                                  disabled={submitting}
                                  onClick={handleSubmit}
                                  label="Подтвердить"
                                  secondary={true}/>
                </CardActions>
            </Card>
        )
    }
}