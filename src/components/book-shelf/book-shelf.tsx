import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import { IBookCard } from '../../types';
import { BookCard } from '../book-card/book-card';
import { Navigation } from '../navigation/navigation';

type IBookShelfProps = {
  booksToBeDisplayed: IBookCard[];
};

const BookShelf = ({ booksToBeDisplayed }: IBookShelfProps) => {
  const [contentView, setContentView] = useState('content tile');

  return (
    <main>
      <Navigation contentView={contentView} setContentView={setContentView} />

      <ul className={contentView}>
        {booksToBeDisplayed.map((book) => {
          return <BookCard book={book} key={nanoid()} />;
        })}
      </ul>
    </main>
  );
};

export { BookShelf };
