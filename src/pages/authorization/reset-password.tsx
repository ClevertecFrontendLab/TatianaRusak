/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import { changePassword } from '../../api/api-auth';
import { ReactComponent as CheckMark } from '../../assets/icons/check-mark.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';
import { useAppDispatch } from '../../store/store';
import { passwordValidate } from '../../utils/functions';
// import { IResetPasswordFormData, schemaResetPassword } from '../../validations/reset-password';
type IResetPasswordFormData = {
  password: string;
  passwordConfirmation: string;
};

// eslint-disable-next-line complexity
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<IResetPasswordFormData>();

  const [passwordConfirmValue, setPasswordConfirmValue] = useState('');
  const [isPasswordConfirmShown, setPasswordConfirmShown] = useState(false);
  const dispatch = useAppDispatch();
  const [isShown, setIsSHown] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordFieldHasError, setPasswordFieldHasError] = useState(false);

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
                type={isShown ? 'text' : 'password'}
                className={classNames('auth__input', {
                  isError: isPasswordFieldHasError && !dirtyFields.password,
                })}
                {...register('password')}
                value={passwordValue}
                onChange={(e) => {
                  setPasswordValue(e.currentTarget.value);
                  setPasswordFieldHasError(false);
                }}
                onBlur={() => {
                  setPasswordFieldHasError(true);
                  passwordValidate(passwordValue);
                }}
                required={true}
              />
              <label htmlFor='password' className='auth__label'>
                Пароль
              </label>
              <div className='auth__password-eye' onClick={() => setIsSHown(!isShown)} role='presentation'>
                {!!passwordValue && !errors.password && !passwordValidate(passwordValue) && (
                  <CheckMark data-test-id='checkmark' />
                )}
                {!!passwordValue && isShown && <EyeOpen data-test-id='eye-opened' />}
                {!!passwordValue && !isShown && <EyeClose data-test-id='eye-closed' />}
              </div>
              <div className='auth__error-hint'>
                {!isPasswordFieldHasError &&
                  !errors.password &&
                  passwordValidate(passwordValue) &&
                  passwordValidate(passwordValue) !== 'ok' && (
                    <span dangerouslySetInnerHTML={{ __html: passwordValidate(passwordValue) }} />
                  )}
                {isPasswordFieldHasError && passwordValidate(passwordValue) !== 'ok' && (
                  <span className='auth__error'>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
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
