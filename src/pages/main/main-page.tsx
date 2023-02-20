import React, { Fragment, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { BookCard } from '../../components/book-card/book-card';
import { Loader } from '../../components/loader/loader';
import { Navigation } from '../../components/navigation/navigation';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { fetchBooks, fetchCategories } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';

import './main-page.scss';

export const MainPage = () => {
  const [contentView, setContentView] = useState('content tile');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCategories());
  }, [dispatch]);

  const bookState = useTypedSelector((state) => state.bookReducer);
  const books = bookState.allBooks;
  const error = Object.values(bookState.error).find((item) => item) as boolean;
  const loading = Object.values(bookState.loading).find((item) => item) as boolean;

  return (
    <Fragment>
      {loading && (
        <div className='loader__blur'>
          <Loader />
        </div>
      )}

      <main>
        {!error && !loading && (
          <Fragment>
            <Navigation contentView={contentView} setContentView={setContentView} />

            <ul className={contentView}>
              {books.map((book) => {
                return <BookCard book={book} key={nanoid()} />;
              })}
            </ul>
          </Fragment>
        )}
      </main>
    </Fragment>
  );
};
