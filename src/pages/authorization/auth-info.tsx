import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface IAuthInfo {
  title: string;
  text: string;
  direction: string;
}

const AuthInfo = ({ title, text, direction }: IAuthInfo) => {
  const navigate = useNavigate();

  return (
    <div className='auth__inner-box'>
      <div className='auth__info' data-test-id='status-block'>
        <h1 className='auth__info-title'>{title}</h1>
        <p className='auth__info-text'>{text}</p>
        {direction === 'refresh' && (
          <button className='auth__btn' type='button' onClick={() => navigate(0)}>
            повторить
          </button>
        )}
        {direction === 'login' && (
          <button className='auth__btn' type='button' onClick={() => navigate(0)}>
            <NavLink to='/auth'>вход</NavLink>
          </button>
        )}
        {direction === 'registration' && (
          <button className='auth__btn' type='button' onClick={() => navigate(0)}>
            <NavLink to='/registration'>назад к регистрации</NavLink>
          </button>
        )}
      </div>
    </div>
  );
};

export { AuthInfo };
