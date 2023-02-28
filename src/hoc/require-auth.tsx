import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
  const auth = false;

  if (!auth) {
    return <Navigate to='/login' />;
  }

  return children;
};

export { RequireAuth };
