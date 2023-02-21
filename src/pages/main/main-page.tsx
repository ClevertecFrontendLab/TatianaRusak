import React, { Fragment, useEffect, useState } from 'react';

import { BookShelf } from '../../components/book-shelf/book-shelf';
import { Loader } from '../../components/loader/loader';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { fetchBooks } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';

import './main-page.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const bookState = useTypedSelector((state) => state.bookReducer);
  const booksFromApi = bookState.allBooks;
  // const { selectedCategory } = bookState;
  const [booksToBeDisplayed, setBooksToBeDisplayed] = useState(booksFromApi);

  // useEffect(() => {
  //   const filterByCategory = (category: string) => {
  //     if (category === 'all') {
  //       setBooksToBeDisplayed(booksFromApi);
  //     }

  //     setBooksToBeDisplayed(booksToBeDisplayed.filter((book) => book.categories.includes(category)));
  //   };

  //   filterByCategory(selectedCategory);
  // }, [dispatch, booksFromApi, booksToBeDisplayed, selectedCategory]);

  const error = Object.values(bookState.error).find((item) => item) as boolean;
  const loading = Object.values(bookState.loading).find((item) => item) as boolean;

  return (
    <Fragment>
      {loading && (
        <div className='loader__blur'>
          <Loader />
        </div>
      )}

      {!error && !loading && <BookShelf booksToBeDisplayed={booksToBeDisplayed} />}
    </Fragment>
  );
};
