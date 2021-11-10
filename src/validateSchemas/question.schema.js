import * as yup from 'yup';

export const questionSchema = yup.object().shape({
    demand: yup.string().required('Không được để trống'),
    question: yup.string().required('Không được để trống'),
    correctAnswers: yup.string().trim().required('Không được để trống'),
});
