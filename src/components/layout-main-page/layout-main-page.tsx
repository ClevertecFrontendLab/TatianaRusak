import React, { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Menu } from '../menu/menu';

export interface IOutletContext {
  isSortTypeIncrease: boolean;
  setSortType: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutMainPage = () => {
  const [isSortTypeIncrease, setSortType] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Fragment>
      <Menu isSortTypeIncrease={isSortTypeIncrease} />
      <Outlet context={{ isSortTypeIncrease, setSortType, searchQuery, setSearchQuery }} />
    </Fragment>
  );
};
