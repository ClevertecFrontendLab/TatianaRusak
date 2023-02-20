import React from 'react';

import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';
import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg';
import { ReactComponent as Linkedin } from '../../assets/icons/linkedin.svg';
import { ReactComponent as VK } from '../../assets/icons/vk.svg';

import './footer.scss';

export const Footer = () => (
  <div className='wrapper'>
    <div className='footer'>
      <p className='footer__copyright'>© 2020-2023 Cleverland. Все права защищены.</p>
      <ul className='footer__social-listt'>
        <li className='footer__social-item'>
          <a href='/' aria-label='facebook' className='footer__social-link'>
            <Facebook />
          </a>
        </li>
        <li className='footer__social-item'>
          <a href='/' aria-label='facebook' className='footer__social-link'>
            <Instagram />
          </a>
        </li>
        <li className='footer__social-item'>
          <a href='/' aria-label='Save' className='footer__social-link'>
            <VK />
          </a>
        </li>
        <li className='footer__social-item'>
          <a href='/' aria-label='Save' className='footer__social-link'>
            <Linkedin />
          </a>
        </li>
      </ul>
    </div>
  </div>
);
