/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';

import { ReactComponent as Chevron } from '../../assets/icons/chevron.svg';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { changeMode } from '../../store/burger-slice';
import bookStoreCategories from '../../utils/book-categories.json';
import bookStore from '../../utils/books.json';

import './menu.scss';

export const Menu = () => {
  const categoriesFullOfBooks = Object.entries(bookStore);
  const categoriesRu = Object.values(bookStoreCategories);

  const dispatch = useDispatch();
  const isOpened = useTypedSelector((state) => state.burgerReducer.isOpened);

  const toggleMenuMode = () => {
    dispatch(changeMode(!isOpened));
    document.body.classList.toggle('not-scroll');
  };

  const isBooksLocation = useLocation().pathname.split('/').includes('books');
  const isFirstVisit = useLocation().pathname === '/';
  const { bookId } = useParams();
  const [isCategoriesVisible, setCategoriesVisible] = useState(isFirstVisit || isBooksLocation);

  const menuItems = categoriesFullOfBooks.map((item, index) => {
    return (
      <li className='submenu__cat' key={nanoid()} onClick={toggleMenuMode} onKeyDown={toggleMenuMode}>
        <NavLink to={`/books/${item[0]}`} className='submenu__link'>
          <span>{categoriesRu[index]}</span> <span>{item[1].length}</span>
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
              <Chevron className={classNames({ up: isCategoriesVisible })} />
            </h5>
          </NavLink>
          <ul className={classNames('submenu__categories', { visible: isCategoriesVisible })}>
            <li className='submenu__cat' onClick={toggleMenuMode} onKeyDown={toggleMenuMode}>
              <NavLink
                data-test-id='burger-books'
                to='/books/all'
                className={({ isActive }) => (isActive ? 'submenu__link active' : 'submenu__link')}
              >
                <span data-test-id='navigation-books'>Все книги</span>
                <span> </span>
              </NavLink>
            </li>
            {menuItems}
          </ul>
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
