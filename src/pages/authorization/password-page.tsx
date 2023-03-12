/* eslint-disable react/no-danger */
import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import { Loader } from '../../components/loader/loader';
import { useTypedSelector } from '../../hooks/use-typed-selector';

import { AuthInfo } from './auth-info';
import { ForgotPassword } from './forgot-password';
import { ResetPassword } from './reset-password';

const ForgotPasswordPage = () => {
  const authState = useTypedSelector((state) => state.authReducer);
  const { loading } = authState;
  const { letterIsSent } = authState;
  const { errorAny } = authState;
  const { error400 } = authState;
  const { errorMessage } = authState;
  const { passwordIsChanged } = authState;
  const location = useLocation();
  const code = location.search.substring(6);

  return (
    <Fragment>
      {loading && (
        <div className='loader__blur'>
          <Loader />
        </div>
      )}
      <div className='auth__wrapper'>
        <div className='auth__inner' data-test-id='auth'>
          {!letterIsSent && !code && <ForgotPassword />}
          {code && !errorAny && <ResetPassword />}
          {!code && letterIsSent && !errorMessage && (
            <AuthInfo
              title='Письмо выслано'
              text='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
              direction=''
            />
          )}
          {errorAny && (
            <AuthInfo
              title='Данные не сохранились'
              text='Что-то пошло не так. Попробуйте ещё раз'
              direction='refresh'
            />
          )}
          {!errorAny && passwordIsChanged && (
            <AuthInfo
              title='Новые данные сохранены'
              text='Зайдите в личный кабинет, используя свои логин и новый пароль'
              direction='login'
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export { ForgotPasswordPage };