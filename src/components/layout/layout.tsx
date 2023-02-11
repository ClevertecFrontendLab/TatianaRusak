import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';

export const Layout = () => {
  return (
    <Fragment>
      <Header />

      <section className='main-page wrapper'>
        <Menu />
        <Outlet />
      </section>

      <Footer />
    </Fragment>
  );
};
