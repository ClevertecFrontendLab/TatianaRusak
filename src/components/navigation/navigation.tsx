import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as IconCross } from '../../assets/icons/cross.svg';
import { ReactComponent as IconList } from '../../assets/icons/list-btn.svg';
import { ReactComponent as IconSearch } from '../../assets/icons/search.svg';
import { ReactComponent as SortAscending } from '../../assets/icons/sort-ascending.svg';
import { ReactComponent as SortDescending } from '../../assets/icons/sort-descending.svg';
import { ReactComponent as IconTile } from '../../assets/icons/tile-btn.svg';
import { IOutletContext } from '../layout-main-page/layout-main-page';

import './navigation.scss';

type INavigationProps = {
  contentView: string;
  setContentView: React.Dispatch<React.SetStateAction<string>>;
};

export const Navigation = ({ contentView, setContentView }: INavigationProps) => {
  const [isSearchInputOpen, setSearchInputOpen] = useState(false);
  const { isSortTypeIncrease, setSortType, setSearchQuery } = useOutletContext<IOutletContext>();

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
      <form
        data-test-id='button-search-open'
        className={classNames('navigation__search-form', { open: isSearchInputOpen })}
      >
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
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button
          type='button'
          className={classNames('navigation__search-cross', { visible: isSearchInputOpen })}
          onClick={() => setSearchInputOpen(false)}
        >
          <IconCross data-test-id='button-search-close' />
        </button>
      </form>

      <button
        type='button'
        className={classNames('navigation__sort', { hidden: isSearchInputOpen })}
        onClick={() => setSortType(!isSortTypeIncrease)}
        data-test-id='sort-rating-button'
      >
        {isSortTypeIncrease ? <SortDescending /> : <SortAscending />} По рейтингу
      </button>

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
