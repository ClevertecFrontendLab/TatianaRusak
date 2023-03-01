import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';

import './authorization.scss';

const LoginPage = () => {
  const [isShown, setIsSHown] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [passwordValue, setPasswordValue] = useState('');
  const [isMistake, setMistake] = useState(false);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    reset();
  };

  // useEffect(() => {
  //   if (!isSafeToReset) return;

  //   reset(result); // asynchronously reset your form values
  // }, [reset]);

  return (
    <div className='auth__wrapper'>
      <div className='auth__inner'>
        <div className='auth__title-block'>
          <h1 className='auth__title'>Вход в личный кабинет</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='auth__inputs-set'>
            <div className='auth__input-group'>
              <input type='text' className='auth__input' required={true} {...register('login', { required: true })} />
              <label htmlFor='login' className='auth__label'>
                Логин
              </label>
            </div>
            <div className='auth__input-group'>
              <input
                type={isShown ? 'text' : 'password'}
                className='auth__input'
                {...register('password', { required: true })}
                required={true}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.currentTarget.value)}
              />
              <label htmlFor='password' className='auth__label'>
                Пароль
              </label>
              <div className='auth__password-eye' onClick={() => setIsSHown(!isShown)} role='presentation'>
                {!!passwordValue && isShown && <EyeOpen />}
                {!!passwordValue && !isShown && <EyeClose />}
              </div>
            </div>
          </div>
          {true && (
            <div className='auth__forgot-question'>
              <NavLink to='/password-recovery'>Забыли логин или пароль?</NavLink>
            </div>
          )}

          {false && (
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
