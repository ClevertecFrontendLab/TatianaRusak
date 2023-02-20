import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { ErrorMessage } from '../error-message/error-message';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';

export const Layout = () => {
  const bookState = useTypedSelector((state) => state.bookReducer);
  const error = Object.values(bookState.error).find((item) => item) as boolean;

  return (
    <Fragment>
      <Header />
      {error && (
        <div className='wrapper' style={{ position: 'absolute', right: 0, left: 0, top: '65px', zIndex: 100 }}>
          <ErrorMessage />
        </div>
      )}

      <section className='main-content wrapper'>
        <Menu />
        <Outlet />
      </section>

      <Footer />
    </Fragment>
  );
};
