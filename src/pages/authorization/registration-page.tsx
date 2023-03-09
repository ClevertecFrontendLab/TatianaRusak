/* eslint-disable complexity */
/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import { userSignUp } from '../../api/api-auth';
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';
import { Loader } from '../../components/loader/loader';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useAppDispatch } from '../../store/store';
import { IRegistrationFormData, schemaRegistration } from '../../validations/registration';

import './authorization.scss';

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    // watch,
  } = useForm<IRegistrationFormData>({
    resolver: yupResolver(schemaRegistration),
    mode: 'all',
    criteriaMode: 'all',
  });

  const [step, setStep] = useState(1);
  const [isShown, setIsSHown] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const authState = useTypedSelector((state) => state.authReducer);
  const { loading } = authState;
  // const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const dispatch = useAppDispatch();

  const onSubmit = (data: IRegistrationFormData) => {
    dispatch(userSignUp(data));

    // if (!loading) {
    //   navigate('/');
    // }

    // navigate('/');
    reset();

    console.log('submit');
    // console.log('data', data);
    // console.log('testData', testData);
  };

  const preValidate = () => {
    if (step === 1 && isDirty && !errors.username && !errors.password) {
      setStep(2);
      console.log(errors);
    }
    if (step === 2 && isDirty && !errors.firstName && !errors.lastName) {
      setStep(3);
      console.log(errors);
    }
  };

  return (
    <Fragment>
      {loading && (
        <div className='loader__blur'>
          <Loader />
        </div>
      )}

      {!loading && (
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
                        className={classNames('auth__input', { isError: !!errors.username?.message })}
                        {...register('username')}
                        required={true}
                      />
                      <label htmlFor='username' className='auth__label'>
                        Придумайте логин для входа
                      </label>
                      <div className='auth__error-hint'>
                        {isDirty && !errors.username?.message && 'Используйте для логина латинский алфавит и цифры'}
                        {errors.username && (
                          <span dangerouslySetInnerHTML={{ __html: `${errors.username?.message}` }} />
                        )}
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
                      <div className='auth__error-hint'>
                        {isDirty &&
                          !errors.password?.message &&
                          'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                        {errors.password && (
                          <span dangerouslySetInnerHTML={{ __html: `${errors.password?.message}` }} />
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
                        className='auth__input'
                        {...register('firstName', { required: true })}
                        required={true}
                      />
                      <label htmlFor='firstName' className='auth__label'>
                        Имя
                      </label>
                      <div className='auth__error-hint'>
                        {errors.firstName && (
                          <span dangerouslySetInnerHTML={{ __html: `${errors.firstName?.message}` }} />
                        )}
                      </div>
                    </div>
                    <div className='auth__input-group'>
                      <input
                        type='text'
                        className='auth__input'
                        {...register('lastName', { required: true })}
                        required={true}
                      />
                      <label htmlFor='lastName' className='auth__label'>
                        Фамилия
                      </label>
                      <div className='auth__error-hint'>
                        {errors.lastName && (
                          <span dangerouslySetInnerHTML={{ __html: `${errors.lastName?.message}` }} />
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
      )}
      {token && <Navigate to='/' replace={true} />}
    </Fragment>
  );
};

export { RegistrationPage };
