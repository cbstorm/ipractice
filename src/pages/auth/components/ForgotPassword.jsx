import { Container, Step, StepLabel, Stepper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import EnterEmailForm from './EnterEmailForm';
import EnterVerifyCodeForm from './EnterVerifyCodeForm';
import ResetPasswordForm from './ResetPasswordForm';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3),
    },
}));

function getSteps() {
    return [
        'Điền email nhận mã xác thực',
        'Điền mã xác thực',
        'Đặt lại mật khẩu',
    ];
}

const ForgotPassword = ({ onBackLogin }) => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const [email, setEmail] = useState('');
    const steps = getSteps();

    const handleSetEmail = (value) => {
        setEmail(value);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <Container className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === 0 && (
                    <EnterEmailForm
                        onSetEmail={handleSetEmail}
                        onNext={handleNext}
                    />
                )}
                {activeStep === 1 && (
                    <EnterVerifyCodeForm email={email} onNext={handleNext} />
                )}
                {activeStep === 2 && (
                    <ResetPasswordForm
                        onBackLogin={onBackLogin}
                        email={email}
                    />
                )}
            </div>
        </Container>
    );
};

ForgotPassword.propTypes = {
    onBackLogin: PropTypes.func.isRequired,
};

export default ForgotPassword;
