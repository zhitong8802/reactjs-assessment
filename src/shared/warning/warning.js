import React from 'react';
import './warning.css';

const Warning = (props) => (
    <div>
        <div className="backdrop"></div>
        <div className="alert-box">
            <div className="alert-box-actions">
                <a className="btn" onClick={props.CloseWarningClicked}>x</a>
            </div>
            <h1>{props.message}</h1>
        </div>
    </div>
);

export default Warning;