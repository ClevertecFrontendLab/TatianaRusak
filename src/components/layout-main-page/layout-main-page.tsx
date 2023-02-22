import { createContext } from 'vm';

import React, { Fragment, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { fetchBooks, setBooksToDisplay } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';
import { Menu } from '../menu/menu';

export interface IOutletContext {
  isSortTypeIncrease: boolean;
  setSortType: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutMainPage = () => {
  // const bookState = useTypedSelector((state) => state.bookReducer);
  // const booksFromApi = bookState.allBooks;
  // const sortedBooksFromApi = booksFromApi.slice().sort((a, b) => (b.rating > a.rating ? 1 : 0));
  // const [booksToBeDisplayed, setBooksToBeDisplayed] = useState(sortedBooksFromApi);
  // const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSortTypeIncrease, setSortType] = useState(false);
  // const outletContext = [isSortTypeIncrease, setSortType];

  return (
    <Fragment>
      <Menu isSortTypeIncrease={isSortTypeIncrease} />
      <Outlet context={{ isSortTypeIncrease, setSortType }} />
    </Fragment>
  );
};
