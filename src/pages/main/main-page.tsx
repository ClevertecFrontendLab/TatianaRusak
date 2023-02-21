import { nanoid } from 'nanoid';
import React, { Fragment, useEffect, useState } from 'react';
import { BookCard } from '../../components/book-card/book-card';

import { BookShelf } from '../../components/book-shelf/book-shelf';
import { Loader } from '../../components/loader/loader';
import { Navigation } from '../../components/navigation/navigation';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { fetchBooks } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';
import { IBookCard } from '../../types';

import './main-page.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const bookState = useTypedSelector((state) => state.bookReducer);
  const booksFromApi = bookState.allBooks;
  const { selectedCategory } = bookState;
  const [booksToBeDisplayed, setBooksToBeDisplayed] = useState<IBookCard[]>([]);
  const [contentView, setContentView] = useState('content tile');

  useEffect(() => {
    if (selectedCategory === 'all') {
      setBooksToBeDisplayed(booksFromApi);
    } else {
      setBooksToBeDisplayed(booksFromApi.filter((book) => book.categories.includes(selectedCategory)));
    }
  }, [dispatch, booksFromApi, selectedCategory]);

  const error = Object.values(bookState.error).includes(true);
  const loading = Object.values(bookState.loading).includes(true);
  const numberOfBooksInCategory = booksFromApi.filter((book) => book.categories.includes(selectedCategory)).length;

  return (
    <main>
      {!error && !loading && (
        <div>
          <Navigation contentView={contentView} setContentView={setContentView} />

          <ul className={contentView}>
            {booksToBeDisplayed.map((book) => {
              return <BookCard book={book} key={nanoid()} />;
            })}
          </ul>

          {!numberOfBooksInCategory && <p className='content no-books'>В этой категории книг ещё нет</p>}
          {false && <p className='content no-books'>По запросу ничего не найдено</p>}
        </div>
      )}
    </main>
  );
};
