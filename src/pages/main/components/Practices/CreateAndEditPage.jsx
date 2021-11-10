import {
    Container,
    makeStyles,
    Step,
    StepLabel,
    Stepper,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateInitForm from './components/CreateAndEdit/CreateInitForm';
import CreateQuestionList from './components/CreateAndEdit/CreateQuestionList';
import DoneStep from './components/CreateAndEdit/DoneStep';

function getSteps() {
    return ['Tiêu đề và danh mục', 'Bộ câu hỏi', 'Xong'];
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3),
    },
}));

const CreateAndEditPage = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                {activeStep === 0 && <CreateInitForm handleNext={handleNext} />}
                {activeStep === 1 && (
                    <CreateQuestionList
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                )}
                {activeStep === 2 && <DoneStep />}
            </div>
        </Container>
    );
};
export default CreateAndEditPage;
