import React, { Fragment, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { BookCard } from '../../components/book-card/book-card';
import { Loader } from '../../components/loader/loader';
import { Navigation } from '../../components/navigation/navigation';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { fetchBooks, setSelectedBook } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';

import './main-page.scss';

export const MainPage = () => {
  const [contentView, setContentView] = useState('content tile');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(setSelectedBook(null));
  }, [dispatch]);

  const bookState = useTypedSelector((state) => state.bookReducer);
  const books = bookState.allBooks;

  return (
    <Fragment>
      {bookState.loading && (
        <div className='loader__blur'>
          <Loader />
        </div>
      )}

      {!bookState.error && (
        <main>
          <Navigation contentView={contentView} setContentView={setContentView} />
          <ul className={contentView}>
            {books.map((book) => {
              return <BookCard book={book} key={nanoid()} />;
            })}
          </ul>
        </main>
      )}

      {bookState.error && <p className=''>тут какая-то ошибка. надо разобраться!!!!!!!!!!!!!!!!!</p>}
    </Fragment>
  );
};
