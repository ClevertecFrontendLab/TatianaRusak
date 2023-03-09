import * as yup from 'yup';

export const schemaRegistration = yup
  .object({
    username: yup
      .string()
      .required('<span class="auth__error">Используйте для логина латинский алфавит и цифры</span>')
      .matches(/\d/, 'Используйте для логина латинский алфавит и <span class="auth__error">цифры</span>')
      .matches(/[A-Za-z]/, 'Используйте для логина <span class="auth__error">латинский алфавит</span> и цифры')
      .matches(/^[A-Za-z0-9]+$/, '<span class="auth__error">Используйте для логина латинский алфавит и цифры </span>'),
    password: yup
      .string()
      .required('Поле не может быть пустым')
      .min(8, 'Пароль <span class="auth__error">не менее 8 символов</span>, с заглавной буквой и цифрой')
      .matches(/\d/, 'Пароль не менее 8 символов, с заглавной буквой и <span class="auth__error">цифрой</span>')
      .matches(/[A-Z]/, 'Пароль не менее 8 символов, <span class="auth__error">с заглавной буквой</span> и цифрой'),
    firstName: yup.string().required('<span class="auth__error">Поле не может быть пустым<span>'),
    lastName: yup.string().required('<span class="auth__error">Поле не может быть пустым<span>'),
    phone: yup.string().required('<span class="auth__error">В формате +375 (xx) xxx-xx-xx<span>'),
    email: yup
      .string()
      .required('<span class="auth__error">Введите корректный e-mail<span>')
      .email('<span class="auth__error">Введите корректный e-mail<span>'),
  })
  .required();

export type IRegistrationFormData = yup.InferType<typeof schemaRegistration>;
