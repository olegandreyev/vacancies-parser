/**
 * Created by Olejka on 16.03.2017.
 */


import React from 'react';
import {TextField, RaisedButton, FlatButton, Card, CardHeader, CardText} from 'material-ui'
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import { pink500 } from 'material-ui/styles/colors'
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { Link } from 'react-router'

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

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <p>
                        Select campaign settings. Campaign settings can include your budget, network, bidding
                        options and adjustments, location targeting, campaign end date, and other settings that
                        affect an entire campaign.
                    </p>
                );
            case 1:
                return (
                    <div>
                        <TextField style={{marginTop: 0}} floatingLabelText="Ad group name"/>
                        <p>
                            Ad group status is different than the statuses for campaigns, ads, and keywords, though the
                            statuses can affect each other. Ad groups are contained within a campaign, and each campaign
                            can
                            have one or more ad groups. Within each ad group are ads, keywords, and bids.
                        </p>
                        <p>Something something whatever cool</p>
                    </div>
                );
            case 2:
                return (
                    <p>
                        Try out different ad text to see what brings in the most customers, and learn how to
                        enhance your ads using features like ad extensions. If you run into any problems with your
                        ads, find out how to tell if they're running and how to resolve approval issues.
                    </p>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};
        const { handleSubmit } = this.props;

        if (finished) {
            return (
                <div style={contentStyle}>
                    <h3>
                        You have been registered in system!
                    </h3>
                    <p>
                        Congratulations, now you can go to <Link to="login" className='underline'>Login Page </Link>
                        using your email and password
                    </p>
                </div>
            );
        }

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onTouchTap={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label={stepIndex === 2 ? 'Finish' : 'Next'}
                        primary={true}
                        onTouchTap={this.handleNext}
                    />
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;

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
                        {this.renderContent()}
                    </ExpandTransition>
                </CardText>
            </Card>
        );
    }
}

export default RegisterFormWizard;