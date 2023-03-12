import * as yup from 'yup';

export const schemaRegistration = yup
  .object({
    username: yup.string().required('khkjhkjhkjhk'),
    password: yup
      .string()
      .required(
        '<span class="auth__error" data-test-id="hint">Пароль не менее 8 символов, с заглавной буквой и цифрой<span>'
      ),
    firstName: yup.string().required('<span class="auth__error" data-test-id="hint">Поле не может быть пустым<span>'),
    lastName: yup.string().required('<span class="auth__error" data-test-id="hint">Поле не может быть пустым<span>'),
    phone: yup.string().required('<span class="auth__error">Поле не может быть пустым</span>'),
    // phone: yup.string().required('<span class="auth__error">В формате +375 (xx) xxx-xx-xx<span>'),
    email: yup
      .string()
      .required('<span class="auth__error">Введите корректный e-mail<span>')
      .email('<span class="auth__error">Введите корректный e-mail<span>'),
  })
  .required();

export type IRegistrationFormData = yup.InferType<typeof schemaRegistration>;
