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
  // const { selectedCategory } = bookState;
  const [booksToBeDisplayed, setBooksToBeDisplayed] = useState<IBookCard[]>([]);
  const [contentView, setContentView] = useState('content tile');

  useEffect(() => {
    setBooksToBeDisplayed(booksFromApi);
  }, [booksFromApi]);
  // console.log('booksFromApi', booksFromApi);

  // useEffect(() => {
  //   const filterByCategory = (category: string) => {
  //     if (category === 'all') {
  //       setBooksToBeDisplayed(booksFromApi);
  //     }

  //     setBooksToBeDisplayed(booksToBeDisplayed.filter((book) => book.categories.includes(category)));
  //   };

  //   filterByCategory(selectedCategory);
  // }, [dispatch, booksFromApi, booksToBeDisplayed, selectedCategory]);

  const error = Object.values(bookState.error).includes(true);
  const loading = Object.values(bookState.loading).includes(true);

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
        </div>
      )}
    </main>
  );
};
