export const shuffleQuestionList = (questionList) => {
    questionList.sort(() => Math.random() - 0.5);
};
