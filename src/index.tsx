import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { LayoutMainPage } from './components/layout-main-page/layout-main-page';
import { RequireAuth } from './hoc/require-auth';
import { ForgotPasswordPage } from './pages/authorization/forgot-password';
import { LoginPage } from './pages/authorization/login-page';
import { RegistrationPage } from './pages/authorization/registration-page';
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
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route
            path='/'
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route element={<LayoutMainPage />}>
              <Route index={true} element={<Navigate to='/books/all' />} />
              <Route path='/books/all' element={<MainPage />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/rules' element={<RulesPage title='Правила пользования' />} />
              <Route path='/offerta' element={<RulesPage title='Договор оферты' />} />
            </Route>
            <Route path='/books/:category/:bookId' element={<BookPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
