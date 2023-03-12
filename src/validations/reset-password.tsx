import * as yup from 'yup';

export const schemaResetPassword = yup
  .object({
    password: yup
      .string()
      .required('<span class="auth__error">Поле не может быть пустым</span>')
      .min(
        8,
        '<span data-test-id="hint">Пароль <span class="auth__error">не менее 8 символов</span>, с заглавной буквой и цифрой</span>'
      )
      .matches(/\d/, 'Пароль не менее 8 символов, с заглавной буквой и <span class="auth__error">цифрой</span>')
      .matches(/[A-Z]/, 'Пароль не менее 8 символов, <span class="auth__error">с заглавной буквой</span> и цифрой'),
    passwordConfirmation: yup
      .string()
      .required('<span class="auth__error">Пароли не совпадают</span>')
      .oneOf([yup.ref('password')], '<span class="auth__error">Пароли не совпадают</span>'),
  })
  .required();

export type IResetPasswordFormData = yup.InferType<typeof schemaResetPassword>;
