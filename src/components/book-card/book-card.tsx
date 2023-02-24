import React from 'react';
import { NavLink, useOutletContext, useParams } from 'react-router-dom';

import { ReactComponent as OtherCover } from '../../assets/icons/other_cover.svg';
import { IBookCard } from '../../types';
import { HOST } from '../../utils/constants';
import { deliveryDate } from '../../utils/functions';
import { IOutletContext } from '../layout-main-page/layout-main-page';
import { Rating } from '../rating/rating';

import './book-card.scss';

type BookCardProps = {
  book: IBookCard;
};

const highlight = (searchText: string, title: string) => {
  const regex = new RegExp(searchText, 'gi');

  const newText = title.replace(regex, `<span data-test-id='highlight-matches' class="highlight">$&</span>`);

  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: newText }} />;
};

export const BookCard = ({ book }: BookCardProps) => {
  const oldCategory = 'all';
  const { category } = useParams();
  const actualCategory = category ? category : oldCategory;

  const { searchQuery } = useOutletContext<IOutletContext>();

  return (
    <li className='book' key={book.id}>
      <div data-test-id='card'>
        <NavLink to={`/books/${actualCategory}/${book.id}`}>
          <div className={book.image ? 'book__image-wrapper' : 'book__image-wrapper not-found'}>
            {book.image && (
              <img
                src={`${HOST}${book.image.url}`}
                className={book.image ? 'book__image' : 'book__image not-found'}
                alt='book cover'
              />
            )}
            {!book.image && <OtherCover className='book__image not-found' />}
          </div>
        </NavLink>

        <div className='book__description'>
          <div className='book__rating'>
            <Rating rate={book.rating} />
          </div>

          <div className='book__name'>
            <div className='book__title'>
              <p>{highlight(searchQuery, book.title)}</p>{' '}
            </div>
            <div className='book__author'>
              {book.authors.map((author) => author)}, {book.issueYear}
            </div>
          </div>
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
    </li>
  );
};
