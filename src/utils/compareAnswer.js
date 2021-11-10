const replaceSpecialChar = (str) => {
    const newString = str.replace(
        // eslint-disable-next-line no-useless-escape
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
        ''
    );
    return newString;
};

const replaceShortFormEnglish = (str) => {
    const newStr = str
        .replace(/n't/gi, ' not')
        .replace(/'t/gi, ' not')
        .replace(/'m/gi, ' am')
        .replace(/'s/gi, ' is')
        .replace(/'re/gi, ' are')
        .replace(/'ll/gi, ' will')
        .replace(/'d/gi, ' would')
        .replace(/hello/gi, 'hi');

    return newStr;
};

export const compareConstructedAnswer = (answer, correctAnswer) => {
    const answerReplaceShortForm = replaceShortFormEnglish(answer);
    const answerReplaceSpecialChar = replaceSpecialChar(answerReplaceShortForm);
    const answerLower = answerReplaceSpecialChar.toLowerCase();
    const correctAnswerReplaced = correctAnswer.map((answer) => {
        const answerReplaceShortFormEnglish = replaceShortFormEnglish(answer);
        const answerReplaceSpecialChar = replaceSpecialChar(
            answerReplaceShortFormEnglish
        );
        const answerLowerCase = answerReplaceSpecialChar.toLowerCase();
        return answerLowerCase;
    });
    const isCorrect = correctAnswerReplaced.includes(answerLower);
    return isCorrect;
};

export const compareSelectedAnswer = (answer, correctAnswer) => {
    const isCorrect = correctAnswer.includes(answer);
    return isCorrect;
};
