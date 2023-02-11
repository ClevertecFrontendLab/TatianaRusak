/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as Logo } from '../../assets/icons/logo-clevertec.svg';
import avatar from '../../assets/images/avatar.jpg';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { changeMode } from '../../store/burger-slice';
import { Hamburger } from '../humburger/humburger';

import './header.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const isOpened = useTypedSelector((state) => state.burgerReducer.isOpened);

  const toggleBurgerMode = () => {
    dispatch(changeMode(!isOpened));
    document.body.classList.toggle('not-scroll');
  };

  return (
    <div className='wrapper'>
      <div className='header'>
        <div className={classNames('overlay', { open: isOpened })} onClick={toggleBurgerMode} onKeyDown={() => null} />
        <Hamburger />
        <Link to='/' className='header__link'>
          <Logo />
        </Link>

        <div className='header__content'>
          <h3 className='header__title'>Библиотека</h3>
          <div className='header__person person'>
            <p className='person__name'>Привет, Иван!</p>
            <img src={avatar} alt='' className='person__avatar' />
          </div>
        </div>
      </div>
    </div>
  );
};
