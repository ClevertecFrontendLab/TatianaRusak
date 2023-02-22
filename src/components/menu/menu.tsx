/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useOutletContext, useParams } from 'react-router-dom';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';

import { ReactComponent as Chevron } from '../../assets/icons/chevron.svg';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { fetchCategories, setBooksToDisplay, setSelectedCategory } from '../../store/book-slice';
import { changeMode } from '../../store/burger-slice';
import { useAppDispatch } from '../../store/store';
import { IBookCard } from '../../types';
import { TABLET_BROAD_WIDTH } from '../../utils/constants';
import { getWindowWidth } from '../../utils/functions';
import { IOutletContext } from '../layout-main-page/layout-main-page';

import './menu.scss';

type IMenuProps = {
  // selectedCategory: string;
  // setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  isSortTypeIncrease: boolean;
  // setSortType: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Menu = ({ isSortTypeIncrease }: IMenuProps) => {
  const dispatch = useAppDispatch();
  const bookState = useTypedSelector((state) => state.bookReducer);
  const isOpened = useTypedSelector((state) => state.burgerReducer.isOpened);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleMenuMode = () => {
    if (getWindowWidth() <= TABLET_BROAD_WIDTH) {
      dispatch(changeMode(!isOpened));
      document.body.classList.toggle('not-scroll');
    }
  };

  const categories = useTypedSelector((state) => state.bookReducer.categories);
  const booksFromApi = useTypedSelector((state) => state.bookReducer.allBooks);
  const sortedBooksFromApi = booksFromApi.slice().sort((a, b) => (b.rating > a.rating ? 1 : 0));
  const { selectedCategory } = bookState;
  const error = Object.values(bookState.error).find((item) => item) as boolean;
  const loading = Object.values(bookState.loading).find((item) => item) as boolean;

  const isBooksLocation = useLocation().pathname.split('/').includes('books');
  const isFirstVisit = useLocation().pathname === '/';
  const { bookId } = useParams();
  const [isCategoriesVisible, setCategoriesVisible] = useState(isFirstVisit || isBooksLocation);

  const catCountArray = categories.map((categoryName) => {
    return booksFromApi.filter((book) => book.categories.includes(categoryName.name)).length;
  });

  // const { isSortTypeIncrease } = useOutletContext<IOutletContext>();

  useEffect(() => {
    if (selectedCategory === 'all') {
      if (isSortTypeIncrease) {
        dispatch(setBooksToDisplay(booksFromApi.slice().sort((a, b) => a.rating - b.rating)));
      } else {
        dispatch(setBooksToDisplay(booksFromApi.slice().sort((a, b) => b.rating - a.rating)));
      }
    }

    if (selectedCategory !== 'all') {
      if (isSortTypeIncrease) {
        const newBooksArrToDisplay = booksFromApi
          .slice()
          .filter((book) => book.categories.includes(selectedCategory))
          .sort((a, b) => a.rating - b.rating);

        dispatch(setBooksToDisplay(newBooksArrToDisplay));
      } else {
        const newBooksArrToDisplay = booksFromApi
          .slice()
          .filter((book) => book.categories.includes(selectedCategory))
          .sort((a, b) => b.rating - a.rating);

        dispatch(setBooksToDisplay(newBooksArrToDisplay));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const menuItems = categories.map((item, index) => {
    return (
      <li className='submenu__cat' key={nanoid()} onClick={toggleMenuMode} onKeyDown={toggleMenuMode}>
        <NavLink
          to={`/books/${item.path}`}
          className='submenu__link'
          onClick={() => dispatch(setSelectedCategory(item.name))}
        >
          <span>{item.name}</span> <span>{catCountArray[index]}</span>
        </NavLink>
      </li>
    );
  });

  return (
    <aside className={classNames('menu', { open: isOpened }, { hidden: !!bookId })} data-test-id='burger-navigation'>
      <ul className='menu_list'>
        <li className='menu__item '>
          <NavLink
            to='/books/all'
            className={classNames('menu__link showcase', { active: isBooksLocation })}
            data-test-id='navigation-showcase'
            // eslint-disable-next-line react/jsx-no-comment-textnodes
          >
            <h5
              data-test-id='burger-showcase'
              onKeyDown={() => null}
              onClick={() => setCategoriesVisible(!isCategoriesVisible)}
            >
              Витрина книг
              {!loading && !error && <Chevron className={classNames({ up: isCategoriesVisible })} />}
            </h5>
          </NavLink>

          {!error && !loading && (
            <ul className={classNames('submenu__categories', { visible: isCategoriesVisible })}>
              <li className='submenu__cat' onClick={toggleMenuMode} onKeyDown={toggleMenuMode}>
                <NavLink
                  data-test-id='burger-books'
                  to='/books/all'
                  className={({ isActive }) => (isActive ? 'submenu__link active' : 'submenu__link')}
                  onClick={() => dispatch(setSelectedCategory('all'))}
                >
                  <span data-test-id='navigation-books'>Все книги</span>
                  <span> </span>
                </NavLink>
              </li>
              {menuItems}
            </ul>
          )}
        </li>
        <li className='menu__item' onClick={toggleMenuMode} onKeyDown={toggleMenuMode}>
          <NavLink to='/rules' className='menu__link' data-test-id='navigation-terms'>
            <h5 data-test-id='burger-terms' onKeyDown={() => null} onClick={() => setCategoriesVisible(false)}>
              Правила пользования
            </h5>
          </NavLink>
        </li>
        <li className='menu__item'>
          <NavLink to='/offerta' className='menu__link' data-test-id='navigation-contract'>
            <h5
              data-test-id='burger-contract'
              onKeyDown={() => null}
              onClick={() => {
                setCategoriesVisible(false);
                toggleMenuMode();
              }}
            >
              Договор оферты
            </h5>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
