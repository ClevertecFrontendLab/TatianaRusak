/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { changePassword } from '../../api/api-auth';
import { ReactComponent as CheckMark } from '../../assets/icons/check-mark.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';
import { useAppDispatch } from '../../store/store';
import { IResetPasswordFormData, schemaResetPassword } from '../../validations/reset-password';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IResetPasswordFormData>({
    resolver: yupResolver(schemaResetPassword),
    mode: 'all',
    criteriaMode: 'all',
  });

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordConfirmValue, setPasswordConfirmValue] = useState('');
  const [isPasswordShown, setPasswordShown] = useState(false);
  const [isPasswordInputDirty, setPasswordInputDirty] = useState(false);
  const [isPasswordConfirmShown, setPasswordConfirmShown] = useState(false);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const code = location.search.substring(6);

  const onSubmit = (formData: IResetPasswordFormData) => {
    const data = {
      ...formData,
      code,
    };

    dispatch(changePassword(data));
  };

  return (
    <div className='auth__inner-box'>
      <div className='auth__form'>
        <div className='auth__title-block'>
          <h1 className='auth__title'>Восстановление</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form'>
          <div className='auth__inputs-set'>
            <div className='auth__input-group'>
              <input
                type={isPasswordShown ? 'text' : 'password'}
                className='auth__input'
                {...register('password')}
                value={passwordValue}
                onChange={(e) => {
                  console.log('errors', errors);
                  setPasswordValue(e.currentTarget.value);
                }}
                required={true}
                onBlur={() => setPasswordInputDirty(true)}
              />
              <label htmlFor='password' className='auth__label'>
                Пароль
              </label>
              <div
                className='auth__password-eye'
                onClick={() => setPasswordShown(!isPasswordShown)}
                role='presentation'
              >
                {!!passwordValue && !errors.password && <CheckMark data-test-id='checkmark' />}
                {!!passwordValue && isPasswordShown && <EyeOpen data-test-id='eye-opened' />}
                {!!passwordValue && !isPasswordShown && <EyeClose data-test-id='eye-closed' />}
              </div>

              <div className='auth__error-hint'>
                {isDirty && !errors.password?.message && 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                {errors.password && <span dangerouslySetInnerHTML={{ __html: `${errors.password?.message}` }} />}
                {isPasswordInputDirty && !passwordValue && (
                  <span className='auth__error' data-test-id='hint'>
                    Поле не может быть пустым
                  </span>
                )}
              </div>
            </div>
            <div className='auth__input-group'>
              <input
                type={isPasswordConfirmShown ? 'text' : 'password'}
                className='auth__input'
                {...register('passwordConfirmation')}
                required={true}
                value={passwordConfirmValue}
                onChange={(e) => setPasswordConfirmValue(e.currentTarget.value)}
              />
              <label htmlFor='passwordConfirmation' className='auth__label'>
                Повторите пароль
              </label>
              <div
                className='auth__password-eye'
                onClick={() => setPasswordConfirmShown(!isPasswordConfirmShown)}
                role='presentation'
              >
                {!!passwordConfirmValue && isPasswordConfirmShown && <EyeOpen data-test-id='eye-opened' />}
                {!!passwordConfirmValue && !isPasswordConfirmShown && <EyeClose data-test-id='eye-closed' />}
              </div>
              <div className='auth__error-hint'>
                {errors.passwordConfirmation && (
                  <span
                    data-test-id='hint'
                    dangerouslySetInnerHTML={{ __html: `${errors.passwordConfirmation?.message}` }}
                  />
                )}
              </div>
            </div>
          </div>

          <button type='submit' className='auth__btn'>
            сохранить изменения
          </button>
        </form>

        <div className='auth__error-hint' data-test-id='hint'>
          После сохранения войдите в библиотеку, используя новый пароль
        </div>
      </div>
    </div>
  );
};

export { ResetPassword };