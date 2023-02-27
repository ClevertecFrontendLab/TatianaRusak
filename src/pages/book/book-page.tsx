/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable global-require */
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { fetchSelectedBook } from '../../api/api';
import { ReactComponent as Chevron } from '../../assets/icons/chevron.svg';
import { Feedback } from '../../components/feedback/feedback';
import { Loader } from '../../components/loader/loader';
import { Rating } from '../../components/rating/rating';
import { SwiperCarousel } from '../../components/SwiperCarousel/swiper-carousel';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { setSelectedBook } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store';
import { HOST } from '../../utils/constants';
import { deliveryDate } from '../../utils/functions';

import './book-page.scss';
import '../../components/SwiperCarousel/swiper-carousel.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export const BookPage = () => {
  const { bookId, category } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bookId) {
      dispatch(fetchSelectedBook(bookId));
    }

    return () => {
      dispatch(setSelectedBook(null));
    };
  }, [bookId, dispatch]);

  const bookState = useTypedSelector((state) => state.bookReducer);
  const categoryActual =
    category === 'all' ? 'Все книги' : bookState?.allBooks.find((book) => book.id === Number(bookId))?.categories[0];
  const title = bookState?.allBooks.find((book) => book.id === Number(bookId))?.title;

  const book = bookState.selectedBook;
  const error = bookState.error.fetchSelectedBook;
  const loading = bookState.loading.fetchSelectedBook;

  const imagesArr = book
    ? book.images.reduce<string[]>((acc, imageObj) => [...acc, `${HOST}${imageObj.url}`], [])
    : ([] as string[]);

  const [isFeedbacksVisible, setFeedbacksVisibility] = useState(false);

  const navigate = useNavigate();

  return (
    <Fragment>
      {loading && (
        <div className='loader__blur'>
          <Loader />
        </div>
      )}

      <section className='book-page'>
        <div className='book-page__breadcrumbs'>
          <div className='wrapper'>
            <span
              onClick={() => navigate(-1)}
              onKeyDown={() => navigate(-1)}
              className='book-page__crumb'
              data-test-id='breadcrumbs-link'
            >
              {categoryActual}
            </span>{' '}
            / <span data-test-id='book-name'>{title}</span>
          </div>
        </div>
        {!error && !loading && book && (
          <div className='wrapper'>
            <div className='book-page__book-info'>
              {!book.images.length && <div className='book-page__book-cover no-cover' data-test-id='slide-big' />}
              {book.images.length !== 0 && (
                <div className='book-page__carousel-wrapper'>
                  <SwiperCarousel images={imagesArr} />
                </div>
              )}
              <div className='book-page__book-about'>
                <div className='book-page__title' data-test-id='book-title'>
                  {book.title}
                </div>
                <div className='book-page__author'>
                  {book.authors.map((author) => author)}, {book.issueYear}
                </div>
                <div className='book-page__reserve-button'>
                  {!book.booking && !book.delivery && (
                    <button type='button' className='no-booked'>
                      Забронировать
                    </button>
                  )}

                  {book.booking && (
                    <button type='button' className='is-booked'>
                      Забронирована
                    </button>
                  )}

                  {book.delivery && (
                    <button type='button' className='is-booked-till'>
                      Занята {deliveryDate(book.delivery.dateHandedTo)}
                    </button>
                  )}
                </div>
                <div className='book-page__description'>
                  <h5 className='book-page__description-title'>О книге</h5>
                  <div className='book-page__description-text'>{book.description}</div>
                </div>
              </div>
            </div>
            <div className='book-page__additional-info additional'>
              <div className='additional__rating'>
                <h5 className='additional__title'>Рейтинг</h5>
                <div className='additional__rate-stars'>
                  <Rating rate={book.rating} />
                  <span>{book.rating}</span>
                </div>
              </div>
              <div className='additional__details'>
                <h5 className='additional__title'>Подробная информация</h5>
                <div className='additional__properties'>
                  <p className='additional__prop'>
                    <span className='additional__prop-name'>Издательство</span>
                    <span className='additional__prop-value'>{book.publish}</span>
                  </p>
                  <p className='additional__prop'>
                    <span className='additional__prop-name'>Год издания</span>
                    <span className='additional__prop-value'>{book.issueYear}</span>
                  </p>
                  <p className='additional__prop'>
                    <span className='additional__prop-name'>Страниц</span>
                    <span className='additional__prop-value'>{book.pages}</span>
                  </p>
                  <p className='additional__prop'>
                    <span className='additional__prop-name'>Переплет</span>
                    <span className='additional__prop-value'>{book.cover}</span>
                  </p>
                  <p className='additional__prop'>
                    <span className='additional__prop-name'>Формат</span>
                    <span className='additional__prop-value'>{book.format}</span>
                  </p>
                  <p className='additional__prop'>
                    <span className='additional__prop-name'>Жанр</span>
                    <span className='additional__prop-value'>{book.categories[0]}</span>
                  </p>
                  <p className='additional__prop'>
                    <span className='additional__prop-name'>Вес</span>
                    <span className='additional__prop-value'>{book.weight}</span>
                  </p>
                  <p className='additional__prop'>
                    <span className='additional__prop-name'>ISBN</span>
                    <span className='additional__prop-value'>{book.ISBN}</span>
                  </p>
                  <p className='additional__prop'>
                    <span className='additional__prop-name'>Изготовитель</span>
                    <span className='additional__prop-value'>{book.producer}</span>
                  </p>
                </div>
              </div>
              {book.comments !== null && (
                <div className='additional__feedbacks'>
                  <h5 className='additional__title'>
                    Отзывы <span>{book.comments.length}</span>
                    <Chevron
                      onClick={() => setFeedbacksVisibility(!isFeedbacksVisible)}
                      className={classNames({ down: !isFeedbacksVisible })}
                      data-test-id='button-hide-reviews'
                    />
                  </h5>
                  <ul className={classNames('feedback__list', { visible: isFeedbacksVisible })}>
                    {book.comments.map((commentItem) => {
                      return <Feedback feedback={commentItem} key={commentItem.id} />;
                    })}
                  </ul>
                </div>
              )}
              <button type='button' className='book-page__rate-btn' data-test-id='button-rating'>
                оценить книгу
              </button>
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};
