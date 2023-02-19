import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { RulesPage } from './pages/rules/rules-page';
import { store } from './store/store';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index={true} element={<Navigate to='/books/all' />} />
            <Route path='/books/all' element={<MainPage />} />
            <Route path='/books/:category' element={<MainPage />} />
            <Route path='/rules' element={<RulesPage title='Правила пользования' />} />
            <Route path='/offerta' element={<RulesPage title='Договор оферты' />} />
            <Route path='/books/:category/:bookId' element={<BookPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
