import './Header.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT } from '../../shared/redux-action';

class Header extends Component {

    state = {
        timeCounter: null,
        currentTime: new Date()
    }

    componentDidMount() {
        if (this.state.timeCounter == null) {
            var timeCounter = setInterval(() => {
                this.setState({ currentTime: new Date() });
            }, 1000);

            this.setState({
                timeCounter: timeCounter
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timeCounter);
        this.setState({ timeCounter: null });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="left">
                        <div style={{ display: this.props.isLogin ? 'block' : 'none' }}>
                            Welcome <span>{this.props.userName}</span>
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            <span>Time: {this.state.currentTime.toLocaleTimeString()}</span>
                        </div>
                        <ul className="nav navbar-nav">
                            <li key='login'>
                                <Link
                                    to={{ pathname: "/Login" }}
                                    style={{ display: !this.props.isLogin ? 'block' : 'none' }}
                                >Login</Link>
                            </li>
                            <li key='logout'>
                                <Link
                                    to={{ pathname: "/" }}
                                    onClick={this.props.onLogout}
                                    style={{ display: this.props.isLogin ? 'block' : 'none' }}
                                >Signout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin,
        userName: state.userName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({ type: LOGOUT, isLogin: false })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);