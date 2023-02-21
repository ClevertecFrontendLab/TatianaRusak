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
};

export { BookShelf };
