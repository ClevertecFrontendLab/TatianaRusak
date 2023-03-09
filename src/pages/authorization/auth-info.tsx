import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IAuthInfo {
  title: string;
  text: string;
  buttonText: string;
}

const AuthInfo = ({ title, text, buttonText }: IAuthInfo) => {
  const navigate = useNavigate();

  return (
    <div className='auth__info'>
      <h1 className='auth__info-title'>{title}</h1>
      <p className='auth__info-text'>{text}</p>
      <div className='auth__btn' onClick={() => navigate(0)} role='presentation'>
        {buttonText}
      </div>
    </div>
  );
};

export { AuthInfo };
