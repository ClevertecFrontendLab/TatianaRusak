import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as OtherCover } from '../../assets/icons/other_cover.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IBookCard } from '../../types';
import { HOST } from '../../utils/constants';
import { deliveryDate } from '../../utils/functions';
import { Rating } from '../rating/rating';

import './book-card.scss';

type BookCardProps = {
  book: IBookCard;
};

export const BookCard = ({ book }: BookCardProps) => {
  const { category } = useParams();

  return (
    <li className='book' key={book.id} data-test-id='card'>
      <Link to={`/books/${category}/${book.id}`}>
        <div className='book__image-wrapper'>
          {book.image && (
            <img
              src={`${HOST}${book.image}`}
              className={book.image ? 'book__image' : 'book__image not-found'}
              alt='book cover'
            />
          )}
          {!book.image && <OtherCover className='book__image not-found' />}
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
            {book.authors.map((author) => author)}, {book.issueYear}
          </div>
        </div>

        {!book.booking && !book.delivery && (
          <button type='button' className='book__reserve no-booked'>
            Забронировать
          </button>
        )}

        {book.booking && (
          <button type='button' className='book__reserve is-booked'>
            Забронирована
          </button>
        )}

        {book.delivery?.handed && (
          <button type='button' className='book__reserve is-booked-till'>
            Занята {deliveryDate(book.delivery.dateHandedTo)}
          </button>
        )}
      </div>
    </li>
  );
};
