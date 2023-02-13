import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Lottie from 'lottie-react';

import loader from './loader.json';

import './loader.scss';

export const Loader = () => <Lottie animationData={loader} loop={true} />;
