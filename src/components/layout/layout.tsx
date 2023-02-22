import React, { Fragment, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { fetchBooks } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';
import { ErrorMessage } from '../error-message/error-message';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Loader } from '../loader/loader';

export const Layout = () => {
  const bookState = useTypedSelector((state) => state.bookReducer);
  // const booksFromApi = bookState.allBooks;
  // const sortedBooksFromApi = booksFromApi.slice().sort((a, b) => (b.rating > a.rating ? 1 : 0));
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
