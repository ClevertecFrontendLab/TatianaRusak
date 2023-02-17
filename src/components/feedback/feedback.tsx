import React from 'react';

import User from '../../assets/images/user.jpg';
import { IComment } from '../../types';
import { toFormattedDate } from '../../utils/functions';
import { Rating } from '../rating/rating';

interface IFeedbackProps {
  feedback: IComment;
}

export const Feedback = ({ feedback: comment }: IFeedbackProps) => {
  const avatar = comment.user.avatarUrl ? comment.user.avatarUrl : User;

  return (
    <li className='feedback__item'>
      <div className='feedback__user'>
        <img className='feedback__avatar' src={avatar} alt='user avatar' />
        <div className='feedback__name-date'>
          <p className='feedback__name'>
            {' '}
            {comment.user.firstName} {comment.user.lastName}
          </p>
          <p className='feedback__date'>{toFormattedDate(comment.createdAt)}</p>
        </div>
      </div>
      <div className='feedback__rating'>
        <Rating rate={comment.rating} />
      </div>
      <div className='feedback__text'>{comment.text}</div>
    </li>
  );
};
