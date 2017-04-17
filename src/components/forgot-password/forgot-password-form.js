/**
 * Created by Olejka on 17.04.2017.
 */

import React from 'react';
import { reduxForm, Field } from 'redux-form'
import {Card, CardHeader, CardText, CardActions, RaisedButton} from 'material-ui'
import { renderTextField } from 'helpers'
import {deepPurple600, red500 } from 'material-ui/styles/colors'

@reduxForm({
    form:"forgotPassword"
})
export default class ForgotPasswordForm extends React.Component {
    render(){
        const { handleSubmit, submitting, error } = this.props;
        return (
            <Card className="forgot-password-form">
                <CardHeader
                    title="Восстановление пароля"
                    titleColor="white"
                    style={{backgroundColor: deepPurple600}}
                    titleStyle={{fontSize: 21}}
                />
                <CardText style={{paddingTop: 0}}>
                    <form id="forgotPassword" onSubmit={handleSubmit}>
                        <Field fullWidth={true} name="email" component={renderTextField} label="Email"/>
                    </form>
                    <div style={{textAlign:'center',color:red500}}>
                        {error && <strong>{error}</strong>}
                    </div>
                </CardText>
                <CardActions style={{textAlign: 'right'}}>
                    <RaisedButton type="submit"
                                  form="forgotPassword"
                                  disabled={submitting}
                                  onClick={handleSubmit}
                                  label="Восстановить"
                                  secondary={true}/>
                </CardActions>
            </Card>
        )
    }
}