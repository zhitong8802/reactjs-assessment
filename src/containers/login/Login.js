import React, { Component } from 'react';
import LoadingSpinner from '../../shared/loading-spinner/loading-spinner';
import Input from '../../components/UI/Input/Input';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { BsEnvelope, BsLock } from 'react-icons/bs';
import './Login.css';
import { environment } from '../../environment';
import { LOGIN } from '../../shared/redux-action';

class Login extends Component {
    state = {
        isLoading: false,
        errorMsg: '',
        loginForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                validationErrMsg: {
                    requiredErrorMsg: 'Username is required'
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                validationErrMsg: {
                    requiredErrorMsg: 'Password is required'
                },
                valid: false,
                touched: false
            }
        }
    }

    SubmitHandler = (e) => {
        e.preventDefault();

        this.setState({ isLoading: true });

        const loginReq = {
            email: this.state.loginForm['username'].value,
            password: this.state.loginForm['password'].value,
            returnSecureToken: true
        };

        axios.post('accounts:signInWithPassword?key=' + environment.firebaseAPIKey, loginReq)
            .then(resp => {
                if (resp.data.error) {
                    this.setState({ errorMsg: resp.data.error.errorMessage });
                }
                else {
                    this.setState({
                        errorMsg: ''
                    });
                    this.props.onLogin(
                        resp.data.idToken,
                        resp.data.displayName,
                        resp.data.email
                    );
                    this.props.history.push({
                        pathname: '/Profile'
                    });
                }
            })
            .catch(error => {  
                switch(error.response.data.error.message){
                    case 'EMAIL_EXISTS':
                        this.setState({ errorMsg: 'This email does not exist.' });
                        break;
                    case 'EMAIL_NOT_FOUND':
                        this.setState({ errorMsg: 'This email does not exist.' });
                        break;
                    case 'INVALID_PASSWORD':
                        this.setState({ errorMsg: 'This email does not exist.' });
                        break;
                    default:
                        console.log(error.response);
                        this.setState({ errorMsg: 'An unknown error occurred!' });
                }             
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid });
    }

    render() {
        let form = [];
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        if (this.state.isLoading) {
            form = [(
                <div style={{ textAlign: 'center' }}>
                    <LoadingSpinner />
                </div>
            )];
        }
        else {
            form = [
                <div
                    className="alert alert-danger"
                    style={{ visibility: this.state.errorMsg !== '' ? 'visible' : 'hidden' }}
                >
                    <p>{this.state.errorMsg}</p>
                </div>,
                <form onSubmit={this.SubmitHandler}>
                    <label>Sign in to start your session</label>
                    {formElementsArray.map(formElement => (
                        <div className="form-group">
                            <div
                                className="fa-icon">
                                {
                                    formElement.config.elementConfig.type === 'email' ?
                                        <BsEnvelope /> :
                                        <BsLock />
                                }
                            </div>
                            <Input
                                key={formElement.id}                               
                                className="txtRight"
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                            <div
                                className="error-msg"
                                style={{
                                    display: !formElement.config.valid && formElement.config.touched ? 'block' : 'none'
                                }}
                            >{formElement.config.validationErrMsg.requiredErrorMsg}</div>

                        </div>
                    ))}
                    <div>
                        <Link style={{ float: 'left' }} to={{
                            pathname: "/fgtpwsd"
                        }}>I forget my password</Link>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!this.state.formIsValid}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            ];
        }

        return (
            <div className="row">
                <div className="col-xs-12">
                    {form}
                </div>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (token, username, email) => dispatch({ 
            type: LOGIN, 
            isLogin: true, 
            token: token, 
            userName: username,
            email: email
         })
    }
};

export default connect(null, mapDispatchToProps)(Login);