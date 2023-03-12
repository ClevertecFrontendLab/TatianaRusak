import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { LayoutMainPage } from './components/layout-main-page/layout-main-page';
import { RequireAuth } from './hoc/require-auth';
import { LoginPage } from './pages/authorization/login-page';
import { ForgotPasswordPage } from './pages/authorization/password-page';
import { RegistrationPage } from './pages/authorization/registration-page';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { RulesPage } from './pages/rules/rules-page';
import { store } from './store/store';

import './index.scss';
import { RequireNotAuth } from './hoc/require-not-auth';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          {/* <Route path='/auth' element={<LoginPage />} /> */}
          <Route
            path='/auth'
            element={
              <RequireNotAuth>
                <LoginPage />
              </RequireNotAuth>
            }
          />
          <Route
            path='/registration'
            element={
              <RequireNotAuth>
                <RegistrationPage />
              </RequireNotAuth>
            }
          />
          <Route
            path='/forgot-pass'
            element={
              <RequireNotAuth>
                <ForgotPasswordPage />
              </RequireNotAuth>
            }
          />
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
