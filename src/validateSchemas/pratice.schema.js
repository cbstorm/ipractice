import * as yup from 'yup';

export const practiceSchema = yup.object().shape({
    title: yup.string().required('Tiêu đề không được để trống').trim(),
    category: yup.string().required(),
    level: yup.string().required(),
    limitTime: yup.boolean(),
    timeLimited: yup
        .number()
        .nullable()
        .when('limitTime', {
            is: (value) => value === true,
            then: (rule) =>
                rule.required().min(1, 'Thời gian giới hạn phải lớn hơn 0'),
        }),
    sharing: yup.string().required(),
    classId: yup
        .string()
        .nullable()
        .when('sharing', {
            is: (value) => value === 'CLASS',
            then: (rule) => rule.required(),
        }),
});

export const answerFormSchema = yup.object().shape({
    answer: yup.string().required('Phải nhập câu trả lời').lowercase().trim(),
});
