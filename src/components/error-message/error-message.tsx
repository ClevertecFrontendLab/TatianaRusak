import React, { useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { ReactComponent as WarningCircle } from '../../assets/icons/warning-circle.svg';

// import { useTypedSelector } from '../../hooks/use-typed-selector';
import './error-message.scss';

// interface IErrorMessageProps {
//   visibility: boolean;
// }

export const ErrorMessage = () => {
  // const bookState = useTypedSelector((state) => state.bookReducer);
  // const error = Object.values(bookState.error).find((item) => item) as boolean;
  const [visible, setVisible] = useState(true);

  return (
    <div className={classNames('error', { visible })} data-test-id='error'>
      <WarningCircle className='error__warning' />
      <p className='error__message'>Что-то пошло не так. Обновите страницу через некоторое время.</p>

      <Cross className='error__cross' onClick={() => setVisible(false)} />
    </div>
  );
};
