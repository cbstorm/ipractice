import {
    INVALID_OPTIONS,
    OPTIONS_NOT_ENOUGH,
    OPTIONS_NOT_MATCH_CORRECT_ANSWERS,
} from '../constant';

export const convertCorrectAnswerToList = (data) => {
    const correctAnswersStr = data.correctAnswers;
    if (correctAnswersStr.includes(';')) {
        const correctAnswersArr = correctAnswersStr
            .split(';')
            .map((answer) => {
                if (!answer) {
                    return (answer = undefined);
                }
                return answer.trim();
            })
            .filter((answer) => answer !== undefined);
        data.correctAnswers = correctAnswersArr;
        return;
    }
    data.correctAnswers = [correctAnswersStr];
};

export const validateOptionList = (optionList, correctAnswerList) => {
    let error = {
        isError: true,
        type: INVALID_OPTIONS,
        message: OPTIONS_NOT_MATCH_CORRECT_ANSWERS,
    };
    if (optionList.length < 2) {
        error = {
            ...error,
            isError: true,
            message: OPTIONS_NOT_ENOUGH,
        };
        throw error;
    }
    const validOptions = optionList.filter((option) => option.value !== '');
    if (validOptions.length < 2) {
        error = {
            ...error,
            isError: true,
            message: OPTIONS_NOT_ENOUGH,
        };
        throw error;
    }
    for (let i = 0; i < validOptions.length; i++) {
        if (correctAnswerList.includes(validOptions[i].value)) {
            error = { ...error, isError: false, message: '' };
            break;
        }
    }
    if (error.isError) {
        throw error;
    }
    return validOptions;
};

export const removeQuestionId = (practiceData) => {
    const { questionList } = practiceData;
    const newQuestionList = questionList.map((question) => {
        return { ...question, id: undefined };
    });
    practiceData.questionList = newQuestionList;
};
