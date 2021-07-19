import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './containers/header/Header';
import MainScreen from './containers/main-screen/main-screen';
import Login from './containers/login/Login';
import Unauthorized from './containers/unauthorized/Unauthorized';
import Profile from './containers/profile/Profile';
import ForgetPassword from './containers/forget-password/forget-password';
import ChangePassword from './containers/change-password/change-password';
import SideBarMenu from './containers/side-bar-menu/Side-Bar-Menu';
import CarList from './containers/cars/car-list/car-list';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {
          this.props.isLogin ? <SideBarMenu /> : null
        }
        <Switch>
          <Route path="/" exact component={MainScreen} />
          <Route path="/Home" component={MainScreen} />
          <Route path="/Login" component={Login} />
          <Route path="/Profile" component={Profile} />
          <Route path="/fgtpwsd" component={ForgetPassword} />
          <Route path="/change" component={ChangePassword} />
          <Route path="/Carlist" component={CarList} />
          <Route path="/Unauthorized" component={Unauthorized} />
          <Redirect from="/**" to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (userName) => dispatch({ type: 'LOGIN', isLogin: true, userName: userName }),
    onLogout: () => dispatch({ type: 'LOGOUT', isLogin: false })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
