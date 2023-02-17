/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies, dirnames/match-kebab-case
import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import { TABLET_BROAD_WIDTH } from '../../utils/constants';
import { getWindowWidth } from '../../utils/functions';

import './swiper-carousel.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

type SwiperCarouselProp = {
  images: string[];
};

export const SwiperCarousel = ({ images }: SwiperCarouselProp) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  console.log('images', images);

  return (
    <Fragment>
      <Swiper
        loop={true}
        spaceBetween={10}
        pagination={getWindowWidth() <= TABLET_BROAD_WIDTH}
        modules={[Pagination, Thumbs]}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        grabCursor={true}
        slideToClickedSlide={true}
        className='swiper-carousel'
        data-test-id='slide-big'
      >
        {images.map((image) => {
          return (
            <SwiperSlide key={nanoid()}>
              <img className='book-page__book-cover' src={image} alt='book over' />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={34}
          slidesPerView={5}
          freeMode={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={classNames('swiper-carousel-thumbs', { 'swiper-carousel-thumbs-center': images.length < 5 })}
        >
          {images.map((image) => {
            return (
              <SwiperSlide key={nanoid()} data-test-id='slide-mini'>
                <img className='swiper-carousel-thumb-cover' src={image} alt='book over' />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Fragment>
  );
};
