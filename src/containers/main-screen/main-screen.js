import React, { Component } from 'react';
import './main-screen.css';
import Warning from '../../shared/warning/warning';

class MainScreen extends Component {
    state = {
        showWarning: true
    }

    CloseWarningHandler = () => {
        this.setState({ showWarning: false });
    }

    render() {
        var mainscreen = [
            <div className="container">
                <iframe
                    className="responsive-iframe"
                    src="https://www.baidu.com"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    width="100%"
                    height="100%"
                    scrolling="no"
                ></iframe>
            </div>
        ];

        if (this.state.showWarning) {
            mainscreen.push((
                <Warning
                    message="WARNING"
                    CloseWarningClicked={this.CloseWarningHandler}
                />)
            );
        }

        return mainscreen;
    }
}

export default MainScreen;