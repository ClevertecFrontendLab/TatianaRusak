import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { ErrorMessage } from '../error-message/error-message';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Loader } from '../loader/loader';

export const Layout = () => {
  const bookState = useTypedSelector((state) => state.bookReducer);
  const error = Object.values(bookState.error).includes(true);
  const loading = Object.values(bookState.loading).includes(true);

  return (
    <Fragment>
      <Header />
      {error && (
        <div className='wrapper' style={{ position: 'absolute', right: 0, left: 0, top: '65px', zIndex: 100 }}>
          <ErrorMessage />
        </div>
      )}
      {loading && (
        <div className='loader__blur'>
          <Loader />
        </div>
      )}

      <section className='main-content wrapper'>
        <Outlet />
      </section>

      <Footer />
    </Fragment>
  );
};
