import React, { useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as IconCross } from '../../assets/icons/cross.svg';
import { ReactComponent as IconList } from '../../assets/icons/list-btn.svg';
import { ReactComponent as IconSearch } from '../../assets/icons/search.svg';
import { ReactComponent as IconTile } from '../../assets/icons/tile-btn.svg';

import './navigation.scss';

type INavigationProps = {
  contentView: string;
  setContentView: React.Dispatch<React.SetStateAction<string>>;
};

export const Navigation = ({ contentView, setContentView }: INavigationProps) => {
  const [isSearchInputOpen, setSearchInputOpen] = useState(false);

  const changeContentView = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const { value } = e.target;

      setContentView(`content ${value}`);
    }
  };

  const makeSearchInputWide = () => {
    setSearchInputOpen(true);
  };

  return (
    <div className='navigation'>
      <form data-test-id='button-search-open' className={classNames('navigation__form', { open: isSearchInputOpen })}>
        <button
          type='button'
          className={classNames('navigation__search-loupe', { hidden: isSearchInputOpen })}
          onClick={makeSearchInputWide}
        >
          <IconSearch />
        </button>
        <input
          type='text'
          className={classNames('navigation__search', { open: isSearchInputOpen })}
          placeholder='Поиск книги или автора…'
          data-test-id='input-search'
        />
        <button
          type='button'
          className={classNames('navigation__search-cross', { visible: isSearchInputOpen })}
          onClick={() => setSearchInputOpen(false)}
        >
          <IconCross data-test-id='button-search-close' />
        </button>
      </form>

      <select
        id='filter'
        className={classNames('navigation__filter', { hidden: isSearchInputOpen })}
        placeholder='По рейтингу'
      >
        <option value='rate'>По рейтингу</option>
        <option value='date'>По дате</option>
        <option value='price'>По цене</option>
      </select>

      <div className={classNames('navigation__display', { hidden: isSearchInputOpen })}>
        <input
          type='radio'
          id='display-tile'
          name='display'
          value='tile'
          checked={contentView === 'content tile'}
          onChange={(e) => changeContentView(e)}
        />
        <label className='display-btn tile' htmlFor='display-tile' data-test-id='button-menu-view-window'>
          <IconList />
        </label>
        <input
          type='radio'
          id='display-list'
          name='display'
          value='list'
          checked={contentView === 'content list'}
          onChange={(e) => changeContentView(e)}
        />
        <label className='display-btn list' htmlFor='display-list' data-test-id='button-menu-view-list'>
          <IconTile />
        </label>
      </div>
    </div>
  );
};
