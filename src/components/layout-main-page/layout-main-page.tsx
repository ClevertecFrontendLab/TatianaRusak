import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Menu } from '../menu/menu';

export const LayoutMainPage = () => {
  return (
    <Fragment>
      <Menu />
      <Outlet />
    </Fragment>
  );
};
