import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface IAuthInfo {
  title: string;
  text: string;
  direction: string;
}

const AuthInfo = ({ title, text, direction }: IAuthInfo) => {
  const navigate = useNavigate();

  return (
    <div className='auth__info'>
      <h1 className='auth__info-title'>{title}</h1>
      <p className='auth__info-text'>{text}</p>
      {direction === 'refresh' && (
        <button className='auth__btn' type='button' onClick={() => navigate(0)}>
          повторить
        </button>
      )}
      {direction === 'login' && (
        <Link to='/login' className='auth__btn'>
          вход
        </Link>
      )}
      {direction === 'registration' && (
        <Link to='/registration' className='auth__btn'>
          назад к регистрации
        </Link>
      )}
    </div>
  );
};

export { AuthInfo };
