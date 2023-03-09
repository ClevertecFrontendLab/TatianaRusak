/* eslint-disable react/no-danger */
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { Loader } from '../../components/loader/loader';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { IForgotPasswordFormData, schemaForgotPassword } from '../../validations/forgot-password';

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IForgotPasswordFormData>({
    resolver: yupResolver(schemaForgotPassword),
    mode: 'all',
    criteriaMode: 'all',
  });

  const authState = useTypedSelector((state) => state.authReducer);
  const { loading } = authState;

  const onSubmit = (data: IForgotPasswordFormData) => {
    console.log('data', data);
  };

  return (
    <Fragment>
      {loading && (
        <div className='loader__blur'>
          <Loader />
        </div>
      )}
      <div className='auth__wrapper'>
        <div className='auth__inner'>
          <div className='auth__back-to-login'>
            <Arrow />
            <NavLink to='/login' className='auth__registration-link'>
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
                      <div className='auth__error-hint'>
                        {errors.email && <span dangerouslySetInnerHTML={{ __html: `${errors.email?.message}` }} />}
                      </div>{' '}
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
        </div>
      </div>
    </Fragment>
  );
};

export { ForgotPasswordPage };
