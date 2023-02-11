import React from 'react';
import { Link } from 'react-router-dom';

import otherCover from '../../assets/icons/other_cover.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import bookCover from '../../assets/images/book.jpg';
import { IBook } from '../../types';
import { Rating } from '../rating/rating';

import './book-card.scss';

type BookCardProps = {
  book: IBook;
};

export const BookCard = ({ book }: BookCardProps) => {
  const bookedTillDate = new Date(Date.parse(book.bookedTill.split(' ')[0])).getDate();
  const bookedTillMonth = new Date(Date.parse(book.bookedTill.split(' ')[0])).getMonth() + 1;
  const bookedTill = `занята до ${bookedTillDate}.${bookedTillMonth}`;

  return (
    <li className='book' key={book.id} data-test-id='card'>
      <Link to={`/books/${book.category}/${book.id}`}>
        <div className='book__image-wrapper'>
          <img
            src={book.image[0] === 'bookCover' ? bookCover : otherCover}
            className={book.image[0] === 'bookCover' ? 'book__image' : 'book__image not-found'}
            alt='book cover'
          />
        </div>
      </Link>

      <div className='book__description'>
        <div className='book__rating'>
          <Rating rate={book.rating} />
        </div>

        <div className='book__name'>
          <div className='book__title'>
            <p>{book.title}</p>{' '}
          </div>
          <div className='book__author'>
            {book.author}, {book.year}
          </div>
        </div>

        {!book.isBooked && (
          <button type='button' className='book__reserve no-booked'>
            Забронировать
          </button>
        )}

        {book.isBooked && !book.bookedTill && (
          <button type='button' className='book__reserve is-booked'>
            Забронирована
          </button>
        )}

        {book.isBooked && book.bookedTill && (
          <button type='button' className='book__reserve is-booked-till'>
            {bookedTill}
          </button>
        )}
      </div>
    </li>
  );
};
