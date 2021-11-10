import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email không được để trống')
        .email('Email không hợp lệ')
        .lowercase()
        .trim(),
    password: yup
        .string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required('Tên không được để trống')
        .min(5, 'Tên phải có ít nhất 5 ký tự')
        .max(30, 'Tên có tối đa 30 ký tự'),

    email: yup
        .string()
        .required('Email không được để trống')
        .email('Email không hợp lệ')
        .lowercase()
        .trim(),
    password: yup
        .string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: yup
        .string()
        .required('Phải nhập lại mật khẩu')
        .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không đúng'),
});

export const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email không được để trống')
        .email('Email không hợp lệ')
        .lowercase()
        .trim(),
});

export const verifyCodeSchema = yup.object().shape({
    verifyCode: yup
        .string()
        .required('Không được để trống')
        .max(6, 'Mã xác nhận có tối đa 6 ký tự'),
});

export const resetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: yup
        .string()
        .required('Phải nhập lại mật khẩu')
        .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không đúng'),
});

export const editPasswordSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    password: yup
        .string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: yup
        .string()
        .required('Phải nhập lại mật khẩu')
        .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không đúng'),
});

export const changeNameSchema = yup.object().shape({
    name: yup
        .string()
        .required('Không được để trống')
        .min(5, 'Tên phải có ít nhất 5 ký tự')
        .max(30, 'Tên có tối đa 30 ký tự')
        .trim(),
});
