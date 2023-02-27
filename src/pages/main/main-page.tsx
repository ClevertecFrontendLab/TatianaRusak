import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { fetchBooks } from '../../api/api';
import { BookCard } from '../../components/book-card/book-card';
import { IOutletContext } from '../../components/layout-main-page/layout-main-page';
import { Navigation } from '../../components/navigation/navigation';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { setBooksToDisplay } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';

import './main-page.scss';

export const MainPage = () => {
  const bookState = useTypedSelector((state) => state.bookReducer);
  const booksFromApi = useMemo(() => bookState.allBooks, [bookState.allBooks]);
  const { selectedCategory } = bookState;
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

  const { isSortTypeIncrease, searchQuery } = useOutletContext<IOutletContext>();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      if (isSortTypeIncrease) {
        dispatch(
          setBooksToDisplay(
            booksFromApi
              .slice()
              .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .sort((a, b) => a.rating - b.rating)
          )
        );
      } else {
        dispatch(
          setBooksToDisplay(
            booksFromApi
              .slice()
              .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .sort((a, b) => b.rating - a.rating)
          )
        );
      }
    } else {
      const booksFromApiFilteredByCategory = booksFromApi
        .slice()
        .filter((book) => book.categories.includes(selectedCategory));

      if (isSortTypeIncrease) {
        dispatch(
          setBooksToDisplay(
            booksFromApiFilteredByCategory
              .slice()
              .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .sort((a, b) => a.rating - b.rating)
          )
        );
      } else {
        dispatch(
          setBooksToDisplay(
            booksFromApiFilteredByCategory
              .slice()
              .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .sort((a, b) => b.rating - a.rating)
          )
        );
      }
    }
  }, [isSortTypeIncrease, selectedCategory, booksFromApi, dispatch, searchQuery]);

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
