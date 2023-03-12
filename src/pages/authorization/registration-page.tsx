/* eslint-disable complexity */
/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';

import { IUserSignUpData, userSignUp } from '../../api/api-auth';
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { ReactComponent as CheckMark } from '../../assets/icons/check-mark.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';
import { Loader } from '../../components/loader/loader';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useAppDispatch } from '../../store/store';

import { AuthInfo } from './auth-info';

import './authorization.scss';

// type IRegistrationFormData = {
//   username: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
// };

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<IUserSignUpData>();

  const [step, setStep] = useState(1);
  const [isShown, setIsSHown] = useState(false);
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [firstnameValue, setFirstnameValue] = useState('');
  const [lastnameValue, setLastnameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [isUsernameFieldHasError, setUsernameFieldHasError] = useState(false);
  const [isFirstnameFieldHasError, setFirstnameFieldHasError] = useState(false);
  const [isLastnameFieldHasError, setLastnameFieldHasError] = useState(false);
  const [isPasswordFieldHasError, setPasswordFieldHasError] = useState(false);
  const [isPhoneFieldHasError, setPhoneFieldHasError] = useState(false);
  const [isEmailFieldHasError, setEmailFieldHasError] = useState(false);
  // const [isFieldNotValid, setFieldNotValid] = useState(!!errors.username?.message);
  const authState = useTypedSelector((state) => state.authReducer);
  const { letterIsSent } = authState;
  const { loading } = authState;
  const { error400 } = authState;
  const { errorAny } = authState;
  // const navigate = useNavigate();
  // const token = localStorage.getItem('token');

  const dispatch = useAppDispatch();
  // const matches = errors.username?.types?.matches?.toString();
  // const matchesArray = errors.username?.types?.matches?.toString().split(',') || [];

  // const matchesString = errors.username?.types?.matches?.toString().replace(',', ' ') || '';

  const phoneValidate = (phoneString: string) => {
    if (phoneString) {
      switch (true) {
        case !phoneString.match(/^\+\d{3}\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/g):
          return '<span class="auth__error">В формате +375 (xx) xxx-xx-xx</span>';
          break;
        default:
          return 'ok';
      }
    } else {
      return '';
    }
  };

  const emailValidate = (emailString: string) => {
    if (emailString) {
      switch (true) {
        case !emailString.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g):
          return '<span class="auth__error">Введите корректный email</span>';
          break;
        default:
          return 'ok';
      }
    } else {
      return '';
    }
  };

  const usernameValidate = (usernameString: string) => {
    if (usernameString) {
      switch (true) {
        case !!usernameString.match(/[а-яА-Я]/g) && !usernameString.match(/[0-9]/g):
          return 'Используйте для логина <span class="auth__error">латинский алфавит</span> и <span class="auth__error">цифры</span>';
          break;
        case !!usernameString.match(/[а-яА-Я]/g):
          return 'Используйте для логина <span class="auth__error">латинский алфавит</span> и цифры';
          break;
        case !usernameString.match(/[0-9]/g):
          return 'Используйте для логина латинский алфавит и <span class="auth__error">цифры</span>';
          break;
        case !usernameString.match(/[A-Za-z]/g):
          return 'Используйте для логина <span class="auth__error">латинский алфавит</span> и цифры';
          break;
        default:
          return 'ok';
      }
    }

    return '';
  };

  const passwordValidate = (passwordString: string) => {
    if (passwordString) {
      switch (true) {
        case passwordString.length < 8 && !passwordString.match(/[А-ЯA-Z]/g) && !passwordString.match(/[0-9]/g):
          return 'Пароль <span class="auth__error">не менее 8 символов</span>, с <span class="auth__error">заглавной буквой</span> и <span class="auth__error">цифрой</span>';
          break;
        case passwordString.length < 8 && !!passwordString.match(/[А-ЯA-Z]/g) && !!passwordString.match(/[0-9]/g):
          return 'Пароль <span class="auth__error">не менее 8 символов</span>, с заглавной буквой и цифрой';
          break;
        case passwordString.length >= 8 && !passwordString.match(/[А-ЯA-Z]/g) && !passwordString.match(/[0-9]/g):
          return 'Пароль не менее 8 символов, с <span class="auth__error">заглавной буквой</span> и <span class="auth__error">цифрой</span>';
          break;
        case passwordString.length >= 8 && !!passwordString.match(/[А-ЯA-Z]/g) && !passwordString.match(/[0-9]/g):
          return 'Пароль не менее 8 символов, с заглавной буквой и <span class="auth__error">цифрой</span>';
          break;
        case passwordString.length >= 8 && !passwordString.match(/[А-ЯA-Z]/g) && !!passwordString.match(/[0-9]/g):
          return 'Пароль не менее 8 символов, <span class="auth__error">с заглавной буквой</span> и цифрой';
          break;
        case passwordString.length < 8 && !!passwordString.match(/[А-ЯA-Z]/g) && !passwordString.match(/[0-9]/g):
          return 'Пароль <span class="auth__error">не менее 8 символов</span>, с заглавной буквой и <span class="auth__error">цифрой</span>';
          break;
        case passwordString.length < 8 && !passwordString.match(/[А-ЯA-Z]/g) && !!passwordString.match(/[0-9]/g):
          return 'Пароль <span class="auth__error">не менее 8 символов</span>, <span class="auth__error">с заглавной буквой</span> и цифрой';
          break;
        default:
          return 'ok';
      }
    }

    return '';
  };

  const preValidate = () => {
    console.log(errors);
    console.log(dirtyFields);
    console.log(isUsernameFieldHasError);
    console.log('usernameValidate(usernameValue)', usernameValidate(usernameValue));

    if (errors.username?.message || (step === 1 && !dirtyFields.username)) {
      setUsernameFieldHasError(true);
    }
    if (step === 1 && !dirtyFields.password) {
      setPasswordFieldHasError(true);
    }
    if (
      step === 1 &&
      usernameValue &&
      passwordValue &&
      passwordValidate(passwordValue) === 'ok' &&
      usernameValidate(usernameValue) === 'ok'
    ) {
      setStep(2);
      console.log(errors);
    }

    if (step === 2 && !dirtyFields.firstName) {
      setFirstnameFieldHasError(true);
    }
    if (step === 2 && !dirtyFields.lastName) {
      setLastnameFieldHasError(true);
    }
    if (step === 2 && firstnameValue && lastnameValue) {
      setStep(3);
      console.log(errors);
    }
  };

  const onSubmit = (data: IUserSignUpData) => {
    // eslint-disable-next-line no-param-reassign
    data = {
      email: emailValue,
      username: usernameValue,
      password: passwordValue,
      firstName: firstnameValue,
      lastName: lastnameValue,
      phone: phoneValue,
    };
    console.log('data', data);
    // setPhoneFieldHasError(true);
    // setEmailFieldHasError(true);
    // phoneValidate(phoneValue);
    // emailValidate(emailValue);

    dispatch(userSignUp(data));

    // if (!loading) {
    //   navigate('/');
    // }

    // navigate('/');
    reset();
    setStep(0);
    // console.log('data', data);
    // console.log('testData', testData);
  };

  return (
    <Fragment>
      {loading && (
        <div className='loader__blur'>
          <Loader />
        </div>
      )}

      <div className='auth__wrapper'>
        <div className='auth__inner' data-test-id='auth'>
          {!loading && !letterIsSent && !error400 && !errorAny && (
            <div className='auth__inner-box'>
              <div className='auth__title-block'>
                <h1 className='auth__title'>Регистрация</h1>
                <div className='auth__step'>{step} шаг из 3</div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                {step === 1 && (
                  <div className='auth__step-1'>
                    <div className='auth__inputs-set'>
                      <div className='auth__input-group'>
                        <input
                          type='text'
                          className={classNames('auth__input', {
                            isError: isUsernameFieldHasError && usernameValidate(usernameValue) !== 'ok',
                          })}
                          {...register('username', {
                            required: 'Поле не может быть пустым',
                          })}
                          required={true}
                          onChange={(e) => {
                            setUsernameValue(e.currentTarget.value);
                            setUsernameFieldHasError(false);
                          }}
                          onBlur={() => {
                            setUsernameFieldHasError(true);
                            usernameValidate(usernameValue);
                          }}
                        />
                        <label htmlFor='username' className='auth__label'>
                          Придумайте логин для входа
                        </label>
                        <div className='auth__error-hint'>
                          {!isUsernameFieldHasError &&
                            !errors.username &&
                            usernameValidate(usernameValue) &&
                            usernameValidate(usernameValue) !== 'ok' && (
                              <span dangerouslySetInnerHTML={{ __html: usernameValidate(usernameValue) }} />
                            )}
                          {isUsernameFieldHasError && usernameValidate(usernameValue) !== 'ok' && (
                            <span className='auth__error'>Используйте для логина латинский алфавит и цифры</span>
                          )}
                        </div>
                      </div>
                      <div className='auth__input-group'>
                        <input
                          type={isShown ? 'text' : 'password'}
                          className={classNames('auth__input', {
                            isError: isPasswordFieldHasError && !dirtyFields.password,
                          })}
                          {...register('password')}
                          value={passwordValue}
                          onChange={(e) => {
                            setPasswordValue(e.currentTarget.value);
                            setPasswordFieldHasError(false);
                          }}
                          onBlur={() => {
                            setPasswordFieldHasError(true);
                            passwordValidate(passwordValue);
                          }}
                          required={true}
                        />
                        <label htmlFor='password' className='auth__label'>
                          Пароль
                        </label>
                        <div className='auth__password-eye' onClick={() => setIsSHown(!isShown)} role='presentation'>
                          {!!passwordValue && !errors.password && !passwordValidate(passwordValue) && (
                            <CheckMark data-test-id='checkmark' />
                          )}
                          {!!passwordValue && isShown && <EyeOpen data-test-id='eye-opened' />}
                          {!!passwordValue && !isShown && <EyeClose data-test-id='eye-closed' />}
                        </div>
                        <div className='auth__error-hint'>
                          {!isPasswordFieldHasError &&
                            !errors.password &&
                            passwordValidate(passwordValue) &&
                            passwordValidate(passwordValue) !== 'ok' && (
                              <span dangerouslySetInnerHTML={{ __html: passwordValidate(passwordValue) }} />
                            )}
                          {isPasswordFieldHasError && passwordValidate(passwordValue) !== 'ok' && (
                            <span className='auth__error'>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button type='button' onClick={preValidate} className='auth__btn'>
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
                          className={classNames('auth__input', {
                            isError: isFirstnameFieldHasError && !firstnameValue,
                          })}
                          {...register('firstName', { required: true })}
                          required={true}
                          onChange={(e) => {
                            setFirstnameValue(e.currentTarget.value);
                            setFirstnameFieldHasError(false);
                          }}
                          onBlur={() => {
                            setFirstnameFieldHasError(true);
                          }}
                        />
                        <label htmlFor='firstName' className='auth__label'>
                          Имя
                        </label>
                        <div className='auth__error-hint'>
                          {isFirstnameFieldHasError && !firstnameValue && (
                            <span className='auth__error'>Поле не может быть пустым</span>
                          )}
                        </div>
                      </div>
                      <div className='auth__input-group'>
                        <input
                          type='text'
                          className={classNames('auth__input', {
                            isError: isLastnameFieldHasError && !lastnameValue,
                          })}
                          {...register('lastName', { required: true })}
                          required={true}
                          onChange={(e) => {
                            setLastnameValue(e.currentTarget.value);
                            setLastnameFieldHasError(false);
                          }}
                          onBlur={() => {
                            setLastnameFieldHasError(true);
                          }}
                        />
                        <label htmlFor='lastName' className='auth__label'>
                          Фамилия
                        </label>
                        <div className='auth__error-hint'>
                          {isLastnameFieldHasError && !lastnameValue && (
                            <span className='auth__error'>Поле не может быть пустым</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type='button'
                      onClick={preValidate}
                      className='auth__btn'
                      // disabled={!errors.firstName || !errors.lastName}
                      // disabled={true}
                    >
                      последний шаг
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
                                ' ',
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
                              className={classNames('auth__input', {
                                isError: isPhoneFieldHasError && phoneValidate(phoneValue) !== 'ok',
                              })}
                              guide={true}
                              type='text'
                              name='phone'
                              // onBlur={setPhoneErrorShow(false)}
                              // onChange={onChange}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                onChange();
                                setPhoneValue(e.currentTarget.value);
                                setPhoneFieldHasError(false);
                                console.log(e.currentTarget.value);
                              }}
                              onBlur={() => {
                                setPhoneFieldHasError(true);
                                phoneValidate(phoneValue);
                              }}
                              keepCharPositions={true}
                              required={true}
                              // value={}
                            />
                          )}
                        />
                        <label htmlFor='phone' className='auth__label'>
                          Номер телефона
                        </label>
                        <div className='auth__error-hint'>
                          {/* {dirtyFields.phone && !errors.phone && phoneErrorShow && (
                            <span className='auth__error'>Поле не пожет быть пустым</span>
                          )} */}
                          {!isPhoneFieldHasError &&
                            !!phoneValidate(phoneValue) &&
                            phoneValidate(phoneValue) !== 'ok' && (
                              <span dangerouslySetInnerHTML={{ __html: phoneValidate(phoneValue) }} />
                            )}
                          {isPhoneFieldHasError && phoneValidate(phoneValue) !== 'ok' && (
                            <span className='auth__error'>Поле не может быть пустым</span>
                          )}
                        </div>
                      </div>
                      <div className='auth__input-group'>
                        <input
                          type='text'
                          className={classNames('auth__input', {
                            isError: isEmailFieldHasError && emailValidate(emailValue) !== 'ok',
                          })}
                          {...register('email')}
                          required={true}
                          onChange={(e) => {
                            setEmailValue(e.currentTarget.value);
                            setEmailFieldHasError(false);
                          }}
                          onBlur={() => {
                            setEmailFieldHasError(true);
                            emailValidate(emailValue);
                            console.log('errors', errors);
                          }}
                        />
                        <label htmlFor='email' className='auth__label'>
                          E-mail
                        </label>
                        <div className='auth__error-hint'>
                          {!isEmailFieldHasError &&
                            !!emailValidate(emailValue) &&
                            emailValidate(emailValue) !== 'ok' && (
                              <span dangerouslySetInnerHTML={{ __html: emailValidate(emailValue) }} />
                            )}
                          {isEmailFieldHasError && emailValidate(emailValue) !== 'ok' && (
                            <span className='auth__error'>Поле не может быть пустым</span>
                          )}
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
                <NavLink to='/auth' className='auth__registration-link'>
                  войти
                  <Arrow />
                </NavLink>
              </div>
            </div>
          )}
          {letterIsSent && (
            <AuthInfo
              title='Регистрация успешна'
              text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
              direction='login'
            />
          )}
          {error400 && (
            <AuthInfo
              title='Данные не сохранились'
              text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'
              direction='registration'
            />
          )}
          {errorAny && (
            <AuthInfo
              title='Данные не сохранились'
              text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
              direction='refresh'
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export { RegistrationPage };
