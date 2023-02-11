import React from 'react';
import { nanoid } from 'nanoid';

import { ReactComponent as BorderedStar } from '../../assets/icons/star_bordered.svg';
import { ReactComponent as ColoredStar } from '../../assets/icons/star_colored.svg';

import './rating.scss';

type RatingPropsType = {
  rate: number;
};

export const Rating = (props: RatingPropsType) => {
  return (
    <div className='rating'>
      {props.rate === 0 && <span key={nanoid()}>ещё нет оценок</span>}
      {props.rate !== 0 &&
        [...Array(5)].map((item, index) => {
          if (index < props.rate) {
            return (
              <span className='rating__star' key={nanoid()}>
                <ColoredStar />
              </span>
            );
          }

          return (
            <span className='rating__star' key={nanoid()}>
              <BorderedStar />
            </span>
          );
        })}
    </div>
  );
};
