import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import { BookCard } from '../../components/book-card/book-card';
import { Navigation } from '../../components/navigation/navigation';
import booksStore from '../../utils/books.json';

import './main-page.scss';

export const MainPage = () => {
  const books = Object.values(booksStore)[0];

  const [contentView, setContentView] = useState('content tile');

  return (
    <main>
      <Navigation contentView={contentView} setContentView={setContentView} />
      <ul className={contentView}>
        {books.map((book) => {
          return <BookCard book={book} key={nanoid()} />;
        })}
      </ul>
    </main>
  );
};
