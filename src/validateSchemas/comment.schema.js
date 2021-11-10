import * as yup from 'yup';

export const commentSchema = yup.object().shape({
    discussContent: yup.string().required().trim(),
});
