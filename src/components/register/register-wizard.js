/**
 * Created by Olejka on 16.03.2017.
 */


import React from 'react';
import { Card, CardHeader, CardText, FontIcon } from 'material-ui'
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import { pink500 } from 'material-ui/styles/colors'
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import RegisterPage1 from './register-page-1';
import RegisterPage2 from './register-page-2';
import RegisterPage3 from './register-page-3';

class RegisterFormWizard extends React.Component {

    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
    };

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            }));
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };
    submitForm = (values) => {
        const {stepIndex} = this.state;
        this.setState({
            loading:true,
        });
        return this.props.onSubmit(values)
            .then(() => {
               this.setState({
                   finished:true,
                   stepIndex:stepIndex + 1,
                   loading:false
               })
            })
    };
    renderFormStep(){
        switch (this.state.stepIndex){
            case 0:
                return <RegisterPage1 onSubmit={this.handleNext}/>;
            case 1:
                return <RegisterPage2 prevPage={this.handlePrev} onSubmit={this.handleNext}/>;
            case 2:
                return <RegisterPage3 prevPage={this.handlePrev} onSubmit={this.submitForm}/>;
            case 3:
                return <p>
                    <FontIcon className="fa fa-envelope-o" style={{marginRight:5}}/>
                    Ссылка подтверждения была отправлена на ваш Email адрес, Она будет корректной в течении 6-ти часов.
                </p>;
            default:
                return <p>Unknown Page</p>
        }
    }
    render() {
        const {loading, stepIndex} = this.state;
        const { error } = this.props;

        return (
            <Card style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <CardHeader
                    title="Регистрация"
                    titleColor="white"
                    style={{backgroundColor: pink500}}
                    titleStyle={{fontSize: 21}}
                />
                <CardText>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Установка Email адреса</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Создание пароля</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Дополнительная информация</StepLabel>
                        </Step>
                    </Stepper>
                    <ExpandTransition loading={loading} open={true}>
                        {this.renderFormStep()}
                    </ExpandTransition>
                </CardText>
            </Card>
        );
    }
}

export default RegisterFormWizard;