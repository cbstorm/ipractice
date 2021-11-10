import * as yup from 'yup';

export const createClassSchema = yup.object().shape({
    name: yup
        .string()
        .required('Không được bỏ trống')
        .min(6, 'Tên lớp phải có ít nhất 6 ký tự')
        .max(50, 'Tối đa 50 ký tự')
        .trim(),
    subject: yup.string().required(),
    sharing: yup.string().required(),
});
