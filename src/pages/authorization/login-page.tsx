/* eslint-disable react/no-danger */
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import { userLogIn } from '../../api/api-auth';
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { ReactComponent as CheckMark } from '../../assets/icons/check-mark.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';
import { Loader } from '../../components/loader/loader';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useAppDispatch } from '../../store/store';
import { ILogInFormData, schemaLogIn } from '../../validations/log-in';

import { AuthInfo } from './auth-info';

import './authorization.scss';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogInFormData>({
    resolver: yupResolver(schemaLogIn),
    mode: 'all',
    criteriaMode: 'all',
  });

  const [passwordValue, setPasswordValue] = useState('');
  const [isShown, setIsSHown] = useState(false);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const authState = useTypedSelector((state) => state.authReducer);
  const { loading } = authState;
  const { errorAny } = authState;
  const { error400 } = authState;

  const onSubmit = (data: ILogInFormData) => {
    dispatch(userLogIn(data));
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
          <div className='auth__inner-box'>
            {!errorAny && (
              <div className='auth__form'>
                <div className='auth__title-block'>
                  <h1 className='auth__title'>Вход в личный кабинет</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
                  <div className='auth__inputs-set'>
                    <div className='auth__input-group'>
                      <input
                        type='text'
                        className={classNames('auth__input', { isError: !!errors.identifier?.message || error400 })}
                        required={true}
                        {...register('identifier', { required: true })}
                      />
                      <label htmlFor='login' className='auth__label'>
                        Логин
                      </label>
                      <div className='auth__error-hint'>
                        {errors.identifier && (
                          <span dangerouslySetInnerHTML={{ __html: `${errors.identifier?.message}` }} />
                        )}
                      </div>
                    </div>
                    <div className='auth__input-group'>
                      <input
                        type={isShown ? 'text' : 'password'}
                        className={classNames('auth__input', { isError: !!errors.password?.message || error400 })}
                        {...register('password', { required: true })}
                        required={true}
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.currentTarget.value)}
                      />
                      <label htmlFor='password' className='auth__label'>
                        Пароль
                      </label>
                      <div className='auth__password-eye' onClick={() => setIsSHown(!isShown)} role='presentation'>
                        {/* {!!passwordValue && !errors.password && <CheckMark data-test-id='checkmark' />} */}
                        {!!passwordValue && isShown && <EyeOpen data-test-id='eye-opened' />}
                        {!!passwordValue && !isShown && <EyeClose data-test-id='eye-closed' />}
                      </div>
                      <div className='auth__error-hint'>
                        {errors.password && !passwordValue && (
                          <span dangerouslySetInnerHTML={{ __html: `${errors.password?.message}` }} />
                        )}
                      </div>
                    </div>
                  </div>

                  {!error400 && (
                    <div className='auth__forgot-question'>
                      <NavLink to='/forgot-pass'>Забыли логин или пароль?</NavLink>
                    </div>
                  )}

                  {error400 && (
                    <div className='auth__error-block'>
                      <span className='auth__error' data-test-id='hint'>
                        Неверный логин или пароль!
                      </span>
                      <NavLink to='/forgot-pass'>Восстановить?</NavLink>
                    </div>
                  )}

                  <button type='submit' className='auth__btn'>
                    вход
                  </button>
                </form>

                <div className='auth__registration-question'>
                  Нет учётной записи?{' '}
                  <NavLink to='/registration' className='auth__registration-link'>
                    Регистрация
                    <Arrow />
                  </NavLink>
                </div>
              </div>
            )}
            {errorAny && (
              <AuthInfo title='Вход не выполнен' text='Что-то пошло не так. Попробуйте ещё раз' direction='повторить' />
            )}
          </div>
        </div>
      </div>

      {token && <Navigate to='/' replace={true} />}
    </Fragment>
  );
};

export { LoginPage };
