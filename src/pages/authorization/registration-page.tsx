/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';

import './authorization.scss';

const schema = yup
  .object({
    login: yup
      .string()
      .required('<span class="auth__error">Используйте для логина латинский алфавит и цифры</span>')
      .matches(/\d/, 'Используйте для логина латинский алфавит и <span class="auth__error">цифры</span>')
      .matches(/[A-Za-z]/, 'Используйте для логина <span class="auth__error">латинский алфавит</span> и цифры')
      .matches(/^[A-Za-z0-9]+$/, '<span class="auth__error">Используйте для логина латинский алфавит и цифры </span>'),
    password: yup.string().required('Поле не может быть пустым'),
    firstName: yup.string().required('<span class="auth__error">Поле не может быть пустым<span>'),
    secondName: yup.string().required('<span class="auth__error">Поле не может быть пустым<span>'),
    phone: yup
      .string()
      .required('<span class="auth__error">В формате +375 (xx) xxx-xx-xx<span>')
      .test((value) => value.trim().length > 6),
    email: yup
      .string()
      .required('<span class="auth__error">Введите корректный e-mail<span>')
      .email('<span class="auth__error">Введите корректный e-mail<span>'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    // watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    criteriaMode: 'all',
  });

  const [step, setStep] = useState(1);
  const [isShown, setIsSHown] = useState(false);
  // const [loginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  // const [phoneValue, setPhoneValue] = useState('');
  // const [isMistake] = useState(true);

  // console.log('isValid', isValid);
  // console.log('isDirty', isDirty);
  // console.log('errors', errors);

  // const [login, password] = watch(['login', 'password']);

  const onSubmit = (data: FormData) => {
    console.log('submit');
    console.log('data', data);
  };
  // const loginValidate = (e: ChangeEvent<HTMLInputElement>) => {
  //   const loginCurrent = e.target.value;

  //   setLoginValue(loginCurrent);

  //   const isTestNumber = /^\d+$/.test(loginCurrent);

  //   console.log('isTestNumber', isTestNumber);
  //   console.log('loginCurrent', loginCurrent);
  // };

  // const passwordValidate = () => {
  //   // console.log(password);
  // };
  // console.log(watch(['login', 'password']));

  const preValidate = () => {
    if (step === 1 && isDirty && !errors.login && !errors.password) {
      setStep(2);
      console.log(errors);
    }
    if (step === 2 && isDirty && !errors.firstName && !errors.secondName) {
      setStep(3);
      console.log(errors);
    }
  };

  return (
    <div className='auth__wrapper'>
      <div className='auth__inner'>
        <div className='auth__title-block'>
          <h1 className='auth__title'>Регистрация</h1>
          <div className='auth__step'>{step} шаг из 3</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className='auth__step-1'>
              <div className='auth__inputs-set'>
                <div className='auth__input-group'>
                  <input
                    type='text'
                    // value={loginValue}
                    className={classNames('auth__input', { isError: !!errors.login?.message })}
                    {...register('login')}
                    required={true}
                  />
                  <label htmlFor='login' className='auth__label'>
                    Придумайте логин для входа
                  </label>
                  <div className='auth__error-hint'>
                    {/* <span className={isMistake ? 'auth__error' : ''}>jhgjg</span> */}
                    {isDirty && !errors.login?.message && 'Используйте для логина латинский алфавит и цифры'}
                    {errors.login && <span dangerouslySetInnerHTML={{ __html: `${errors.login?.message}` }} />}
                  </div>
                </div>
                <div className='auth__input-group'>
                  <input
                    type={isShown ? 'text' : 'password'}
                    className='auth__input'
                    {...register('password')}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.currentTarget.value)}
                    required={true}
                  />
                  <label htmlFor='password' className='auth__label'>
                    Пароль
                  </label>
                  <div className='auth__password-eye' onClick={() => setIsSHown(!isShown)} role='presentation'>
                    {!!passwordValue && isShown && <EyeOpen />}
                    {!!passwordValue && !isShown && <EyeClose />}
                  </div>
                  <div className='auth__error-hint'>{errors.password?.message}</div>
                </div>
              </div>

              <button
                type='button'
                onClick={preValidate}
                className='auth__btn'
                // disabled={!(isDirty && !errors.login?.message && !errors.password?.message)}
              >
                следующий шаг
              </button>
            </div>
          )}

          {step === 2 && (
            <div className='auth__step-2'>
              <div className='auth__inputs-set'>
                <div className='auth__input-group'>
                  <input
                    type='text'
                    className='auth__input'
                    {...register('firstName', { required: true })}
                    required={true}
                  />
                  <label htmlFor='firstName' className='auth__label'>
                    Имя
                  </label>
                  <div className='auth__error-hint'>
                    {errors.firstName && <span dangerouslySetInnerHTML={{ __html: `${errors.firstName?.message}` }} />}
                  </div>
                </div>
                <div className='auth__input-group'>
                  <input
                    type='text'
                    className='auth__input'
                    {...register('secondName', { required: true })}
                    // value={passwordValue}
                    // onChange={(e) => setPasswordValue(e.currentTarget.value)}
                    required={true}
                  />
                  <label htmlFor='secondName' className='auth__label'>
                    Фамилия
                  </label>
                  <div className='auth__error-hint'>
                    {errors.secondName && (
                      <span dangerouslySetInnerHTML={{ __html: `${errors.secondName?.message}` }} />
                    )}
                  </div>
                </div>
              </div>

              <button type='button' onClick={preValidate} className='auth__btn'>
                следующий шаг
              </button>
            </div>
          )}
          {step === 3 && (
            <div className='auth_step-3'>
              <div className='auth__inputs-set'>
                <div className='auth__input-group'>
                  <Controller
                    control={control}
                    name='phone'
                    render={({ field: { onChange } }) => (
                      <MaskedInput
                        mask={[
                          '+',
                          '3',
                          '7',
                          '5',
                          '(',
                          /\d/,
                          /\d/,
                          ')',
                          ' ',
                          /\d/,
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                        ]}
                        className='auth__input'
                        guide={true}
                        type='text'
                        onChange={onChange}
                        keepCharPositions={true}
                        required={true}
                      />
                    )}
                  />

                  <label htmlFor='phone' className='auth__label'>
                    Номер телефона
                  </label>
                  <div className='auth__error-hint'>
                    {errors.phone && <span dangerouslySetInnerHTML={{ __html: `${errors.phone?.message}` }} />}
                  </div>
                </div>
                <div className='auth__input-group'>
                  <input
                    type='text'
                    className='auth__input'
                    {...register('email', {
                      required: true,
                    })}
                    required={true}
                  />
                  <label htmlFor='email' className='auth__label'>
                    E-mail
                  </label>
                  <div className='auth__error-hint'>
                    <div className='auth__error-hint'>
                      {errors.email && <span dangerouslySetInnerHTML={{ __html: `${errors.email?.message}` }} />}
                    </div>{' '}
                  </div>
                </div>
              </div>

              <button type='submit' className='auth__btn'>
                зарегистрироваться
              </button>
            </div>
          )}
        </form>

        <div className='auth__registration-question'>
          Есть учётная запись?{' '}
          <NavLink to='/login' className='auth__registration-link'>
            войти
            <Arrow />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export { RegistrationPage };
