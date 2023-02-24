import React from 'react';
import Lottie from 'lottie-react';

import loader from './loader.json';

import './loader.scss';

export const Loader = () => <Lottie animationData={loader} loop={true} data-test-id='loader' />;
