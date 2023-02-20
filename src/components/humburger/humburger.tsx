import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { changeMode } from '../../store/burger-slice';

import './humburger.scss';

export const Hamburger = () => {
  const dispatch = useDispatch();
  const isOpened = useTypedSelector((state) => state.burgerReducer.isOpened);

  const toggleBurgerMode = () => {
    dispatch(changeMode(!isOpened));
    document.body.classList.toggle('not-scroll');
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classNames('hamburger', { open: isOpened })}
      id='hamburger'
      onClick={toggleBurgerMode}
      onKeyDown={toggleBurgerMode}
      data-test-id='button-burger'
    >
      <span className='hamburger__line' />
      <span className='hamburger__line' />
      <span className='hamburger__line' />
    </div>
  );
};
