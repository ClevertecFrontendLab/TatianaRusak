/* eslint-disable react/no-danger */
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { sendLinkIfForgotPassword } from '../../api/api-auth';
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useAppDispatch } from '../../store/store';
import { IForgotPasswordFormData, schemaForgotPassword } from '../../validations/forgot-password';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormData>({
    resolver: yupResolver(schemaForgotPassword),
    mode: 'all',
    criteriaMode: 'all',
  });

  const authState = useTypedSelector((state) => state.authReducer);
  const { errorAny } = authState;
  const dispatch = useAppDispatch();

  const onSubmit = (data: IForgotPasswordFormData) => {
    dispatch(sendLinkIfForgotPassword(data));
  };

  return (
    <Fragment>
      <div className='auth__back-to-login'>
        <NavLink to='/login' className='auth__registration-link'>
          <Arrow />
          вход в личный кабинет
        </NavLink>
      </div>
      <div className='auth__inner-box'>
        <div className='auth__form'>
          <div className='auth__title-block'>
            <h1 className='auth__title'>Восстановление пароля</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='auth__inputs-set'>
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
                  {errors.email && <span dangerouslySetInnerHTML={{ __html: `${errors.email?.message}` }} />}
                  {errorAny && <span dangerouslySetInnerHTML={{ __html: `${errors.email?.message}` }} />}
                  <p>Ha это email будет отправлено письмо c инструкциями по восстановлению пароля</p>
                </div>
              </div>
            </div>

            <button type='submit' className='auth__btn'>
              восстановить
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
      </div>
    </Fragment>
  );
};

export { ForgotPassword };
