import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const RequireNotAuth = ({ children }: Props) => {
  const token = localStorage.getItem('token');

  return token ? <Navigate to='/' /> : children;
};

export { RequireNotAuth };
