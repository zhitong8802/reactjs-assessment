import React from 'react';
import './loading-spinner.css';

const LoadingSpinner = () => (
    <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default LoadingSpinner;