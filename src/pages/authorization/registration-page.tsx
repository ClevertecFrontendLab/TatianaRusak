import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';

import './authorization.scss';

const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit } = useForm();
  const [isShown, setIsSHown] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [isMistake, setMistake] = useState(true);

  const onSubmit = () => {
    console.log();
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
                    className='auth__input'
                    {...register('login', { required: true })}
                    required={true}
                  />
                  <label htmlFor='login' className='auth__label'>
                    Придумайте логин для входа
                  </label>
                  <div className='auth__error-hint'>
                    <span className={isMistake ? 'auth__error' : ''}>
                      Используйте для логина латинский алфавит и цифры
                    </span>
                  </div>
                </div>
                <div className='auth__input-group'>
                  <input
                    type={isShown ? 'text' : 'password'}
                    className='auth__input'
                    {...register('password', { required: true })}
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
                  <div className='auth__error-hint'>
                    <span className={isMistake ? 'auth__error' : ''}>
                      Пароль не менее 8 символов, с заглавной буквой и цифрой
                    </span>
                  </div>
                </div>
              </div>

              <button type='button' onClick={() => setStep(2)} className='auth__btn'>
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
                    {...register('first-name', { required: true })}
                    required={true}
                  />
                  <label htmlFor='first-name' className='auth__label'>
                    Имя
                  </label>
                  <div className='auth__error-hint'>
                    <span className={isMistake ? 'auth__error' : 'auth__no-error'}>Поле не может быть пустым</span>
                  </div>
                </div>
                <div className='auth__input-group'>
                  <input
                    type='text'
                    className='auth__input'
                    {...register('second-name', { required: true })}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.currentTarget.value)}
                    required={true}
                  />
                  <label htmlFor='second-name' className='auth__label'>
                    Фамилия
                  </label>
                  <div className='auth__error-hint'>
                    <span className={isMistake ? 'auth__error' : 'auth__no-error'}>Поле не может быть пустым</span>
                  </div>
                </div>
              </div>

              <button type='button' onClick={() => setStep(3)} className='auth__btn'>
                следующий шаг
              </button>
            </div>
          )}
          {step === 3 && (
            <div className='auth_step-3'>
              <div className='auth__inputs-set'>
                <div className='auth__input-group'>
                  <input
                    type='text'
                    className='auth__input'
                    {...register('first-name', { required: true })}
                    required={true}
                    onChange={(e) => setPhoneValue(e.target.value)}
                  />
                  <label htmlFor='first-name' className='auth__label'>
                    Номер телефона
                  </label>
                  <div className='auth__error-hint'>
                    <span className={isMistake ? 'auth__error' : phoneValue ? '' : 'auth__no-error'}>
                      В формате +375 (xx) xxx-xx-xx
                    </span>
                  </div>
                </div>
                <div className='auth__input-group'>
                  <input
                    type='email'
                    className='auth__input'
                    {...register('second-name', { required: true })}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.currentTarget.value)}
                    required={true}
                  />
                  <label htmlFor='second-name' className='auth__label'>
                    E-mail
                  </label>
                  <div className='auth__error-hint'>
                    <span className={isMistake ? 'auth__error' : 'auth__no-error'}>Введите корректный e-mail</span>
                  </div>
                </div>
              </div>

              <button type='button' onClick={() => setStep(3)} className='auth__btn'>
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
