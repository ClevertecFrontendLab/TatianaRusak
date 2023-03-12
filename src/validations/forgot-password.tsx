import * as yup from 'yup';

export const schemaForgotPassword = yup
  .object({
    email: yup
      .string()
      .required('<span class="auth__error" data-test-id="hint">Поле не может быть пустым<span>')
      .email('<span class="auth__error" data-test-id="hint">Введите корректный e-mail<span>'),
  })
  .required();

export type IForgotPasswordFormData = yup.InferType<typeof schemaForgotPassword>;
