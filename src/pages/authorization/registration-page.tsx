import React, { useState } from 'react';

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';

const Registration = () => {
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    console.log();
  };

  return (
    <div className='auth__wrapper'>
      <div className='auth__inner-form'>
        <h1>Регистрация</h1>
        <div className='auth__step'>{step} шаг из 3</div>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className='auth__step-1'>
              <div className='auth__login'>
                <label htmlFor='login' className='auth__label'>
                  Придумайте логин для входа
                </label>
                <input name='login' type='text' className='auth__input' />
                <div className='auth__error'>Используйте для логина латинский алфавит и цифры</div>
              </div>
              <div className='auth__password'>
                <label htmlFor='password'>Пароль</label>
                <input name='password' type='text' />
                <div className='auth__error'>Пароль не менее 8 символов, с заглавной буквой и цифрой</div>
              </div>
              <button type='button' onClick={() => setStep(2)}>
                следующий шаг
              </button>
            </div>
          )}
          {step === 2 && (
            <div className='auth__step-2'>
              <div className='auth__name'>
                <label htmlFor='name' className='auth__label'>
                  Имя
                </label>
                <input name='name' type='text' className='auth__input' />
                <div className='auth__error'>Поле не может быть пустым</div>
              </div>
              <div className='auth__password'>
                <label htmlFor='login'>Фамилия</label>
                <input name='login' type='text' />
                <div className='auth__error'>Поле не может быть пустым</div>
              </div>
              <button type='button' onClick={() => setStep(3)}>
                последний шаг
              </button>
            </div>
          )}
          {step === 3 && (
            <div className='auth_step-3'>
              <div className='auth__login'>
                <label htmlFor='login'>Номер телефона</label>
                <input name='login' type='text' />
                <div className='auth__error'>
                  <span className='auth__error-color'>В формате +375 (xx) xxx-xx-xx</span>
                </div>
              </div>
              <div className='auth__password'>
                <label htmlFor='login'>E-mail</label>
                <input name='login' type='text' />
                <div className='auth__error'>
                  <span className='auth__error-color'>Введите корректный e-mail</span>
                </div>
              </div>
              <button type='submit' onClick={handleSubmit}>
                зарегистрироваться
              </button>
            </div>
          )}

          <div className='auth__forgot-password'>Забыли логин или пароль?</div>

          <button type='button' className='auth__btn'>
            следующий шаг
          </button>
        </form>

        <div className='auth__ifAuthExist'>
          Есть учётная запись? <span>войти</span> <Arrow />
        </div>
      </div>
    </div>
  );
};

export { Registration };
