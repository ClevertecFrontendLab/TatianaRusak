import React, { Fragment, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { setBooksToDisplay } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';
import { Menu } from '../menu/menu';

export interface IOutletContext {
  isSortTypeIncrease: boolean;
  setSortType: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const LayoutMainPage = () => {
  const [isSortTypeIncrease, setSortType] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useAppDispatch();
  const bookState = useTypedSelector((state) => state.bookReducer);
  const booksFromApi = useTypedSelector((state) => state.bookReducer.allBooks);
  const { selectedCategory } = bookState;

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
    }

    if (selectedCategory !== 'all') {
      if (isSortTypeIncrease) {
        const newBooksArrToDisplay = booksFromApi
          .slice()
          .filter((book) => book.categories.includes(selectedCategory))
          .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .sort((a, b) => a.rating - b.rating);

        dispatch(setBooksToDisplay(newBooksArrToDisplay));
      } else {
        const newBooksArrToDisplay = booksFromApi
          .slice()
          .filter((book) => book.categories.includes(selectedCategory))
          .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .sort((a, b) => b.rating - a.rating);

        dispatch(setBooksToDisplay(newBooksArrToDisplay));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

  return (
    <Fragment>
      <Menu />
      <Outlet context={{ isSortTypeIncrease, setSortType, searchQuery, setSearchQuery }} />
    </Fragment>
  );
};
