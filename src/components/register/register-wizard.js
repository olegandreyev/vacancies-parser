/**
 * Created by Olejka on 16.03.2017.
 */


import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui'
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
    renderFormStep(){
        switch (this.state.stepIndex){
            case 0:
                return <RegisterPage1 onSubmit={this.handleNext}/>;
            case 1:
                return <RegisterPage2 prevPage={this.handlePrev} onSubmit={this.handleNext}/>;
            case 2:
                return <RegisterPage3 prevPage={this.handlePrev} onSubmit={this.props.onSubmit}/>;
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
                    title="Registration"
                    titleColor="white"
                    style={{backgroundColor: pink500}}
                    titleStyle={{fontSize: 21}}
                />
                <CardText>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Set email address</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Create password</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Additional Information</StepLabel>
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