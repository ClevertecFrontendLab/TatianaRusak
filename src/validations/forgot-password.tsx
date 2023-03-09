import * as yup from 'yup';

export const schemaForgotPassword = yup
  .object({
    email: yup
      .string()
      .required('<span class="auth__error">Введите корректный e-mail<span>')
      .email('<span class="auth__error">Введите корректный e-mail<span>'),
  })
  .required();

export type IForgotPasswordFormData = yup.InferType<typeof schemaForgotPassword>;
