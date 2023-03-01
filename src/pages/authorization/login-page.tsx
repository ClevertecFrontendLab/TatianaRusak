import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';

import './authorization.scss';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className='auth__wrapper'>
      <div className='auth__inner'>
        <h1 className='auth__title'>Вход в личный кабинет</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='auth__inputs-set'>
            <div className='auth__input-group'>
              <input type='text' className='auth__input' {...register('login', { required: true })} />
              <label htmlFor='login' className='auth__label'>
                Логин
              </label>
              {false && <EyeOpen className='auth__password-eye' />}
              {true && <EyeClose className='auth__password-eye' />}
            </div>
            <div className='auth__input-group'>
              <input type='text' className='auth__input' {...register('password', { required: true })} />
              <label htmlFor='password' className='auth__label'>
                Пароль
              </label>
              {true && <EyeOpen className='auth__password-eye' />}
              {false && <EyeClose className='auth__password-eye' />}
            </div>
          </div>
          {false && (
            <div className='auth__forgot-question'>
              <NavLink to='/password-recovery'>Забыли логин или пароль?</NavLink>
            </div>
          )}

          {true && (
            <div className='auth__error-block'>
              <span className='auth__error'>Неверный логин или пароль!</span>
              <NavLink to='/password-recovery'>Восстановить?</NavLink>
            </div>
          )}

          <button type='button' onClick={() => null} className='auth__btn'>
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
    </div>
  );
};

export { LoginPage };
