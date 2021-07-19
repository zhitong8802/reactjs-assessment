import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';

class profile extends Component {
    constructor(props) {
        super(props);      
    }

    componentDidMount(){
        if (!this.props.isLogin) {            
            this.props.history.push('/Unauthorized');
        }
    }

    render() {
        return [       
            <div className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <span>User Name : </span>
                        <span>{ this.props.userName }</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <span>Email : </span>
                        <span>{ this.props.email }</span>
                    </div>
                </div>
            </div>
        ];
    };
};

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin,
        token: state.token,
        userName: state.userName,
        email: state.email
    };
};

export default connect(mapStateToProps)(profile);