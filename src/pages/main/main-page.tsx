import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { BookCard } from '../../components/book-card/book-card';
import { IOutletContext } from '../../components/layout-main-page/layout-main-page';
import { Navigation } from '../../components/navigation/navigation';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { fetchBooks, setBooksToDisplay } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';

import './main-page.scss';

export const MainPage = () => {
  const bookState = useTypedSelector((state) => state.bookReducer);
  const booksFromApi = bookState.allBooks;
  const { selectedCategory } = bookState;
  const sortedBooksFromApi = booksFromApi.slice().sort((a, b) => (b.rating > a.rating ? 1 : 0));
  const { booksToDisplay } = bookState;
  const [contentView, setContentView] = useState('content tile');

  const error = Object.values(bookState.error).includes(true);
  const loading = Object.values(bookState.loading).includes(true);

  const numberOfBooksInSelectedCategory = booksFromApi.filter((book) => {
    if (selectedCategory === 'all') {
      return true;
    }

    return book.categories.includes(selectedCategory);
  }).length;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      dispatch(setBooksToDisplay(sortedBooksFromApi));
    } else {
      const bookArrToDisplay = booksFromApi.slice().filter((book) => book.categories.includes(selectedCategory));

      dispatch(setBooksToDisplay(bookArrToDisplay));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksFromApi]);

  const { isSortTypeIncrease } = useOutletContext<IOutletContext>();

  useEffect(() => {
    if (isSortTypeIncrease) {
      dispatch(setBooksToDisplay(booksToDisplay.slice().sort((a, b) => a.rating - b.rating)));
    } else {
      dispatch(setBooksToDisplay(booksToDisplay.slice().sort((a, b) => b.rating - a.rating)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSortTypeIncrease]);

  return (
    <main>
      {!error && !loading && (
        <div>
          <Navigation contentView={contentView} setContentView={setContentView} />

          <ul className={contentView}>
            {booksToDisplay.map((book) => {
              return <BookCard book={book} key={nanoid()} />;
            })}
          </ul>

          {!numberOfBooksInSelectedCategory && (
            <p className='content no-books' data-test-id='empty-category'>
              В этой категории книг ещё нет
            </p>
          )}
          {!!numberOfBooksInSelectedCategory && !booksToDisplay.length && (
            <p className='content no-books' data-test-id='search-result-not-found'>
              По запросу ничего не найдено
            </p>
          )}
        </div>
      )}
    </main>
  );
};
