import * as yup from 'yup';

export const schemaLogIn = yup
  .object({
    identifier: yup.string().required('<span class="auth__error" data-test-id="hint">Поле не может быть пустым</span>'),
    password: yup.string().required('<span class="auth__error" data-test-id="hint">Поле не может быть пустым</span>'),
  })
  .required();

export type ILogInFormData = yup.InferType<typeof schemaLogIn>;
