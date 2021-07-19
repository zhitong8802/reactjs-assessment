import React, { Component } from 'react';
import LoadingSpinner from '../../shared/loading-spinner/loading-spinner';
import Input from '../../components/UI/Input/Input';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { BsEnvelope, BsLock } from 'react-icons/bs';
import './change-password.css';
import { environment } from '../../environment';

class ChangePassword extends Component {
    state = {
        isLoading: false,
        errorMsg: '',
        successMsg: '',
        chgPassForm: {
            currentPass: {
                label: 'Current Password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Please enter Current password'
                },
                value: '',
                validation: {
                    required: true
                },
                validationErrMsg: {
                    requiredErrorMsg: 'Current Password is required'
                },
                valid: false,
                touched: false
            },
            newPass: {
                label: 'New Password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Please enter New password'
                },
                value: '',
                validation: {
                    required: true
                },
                validationErrMsg: {
                    requiredErrorMsg: 'New Password is required'
                },
                valid: false,
                touched: false
            },
            confirmNewPass: {
                label: 'Confirm New Password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Please enter Confirm New password'
                },
                value: '',
                validation: {
                    required: true
                },
                validationErrMsg: {
                    requiredErrorMsg: 'Confirm New Password is required'
                },
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount() {
        if (!this.props.isLogin) {
            this.props.history.push('/Unauthorized');
        }
    }

    SubmitHandler = (e) => {
        e.preventDefault();

        this.setState({ isLoading: true });

        const chkPassReq = {
            email: this.props.email,
            password: this.state.chgPassForm['currentPass'].value,
            returnSecureToken: false
        };

        axios.post('accounts:signInWithPassword?key=' + environment.firebaseAPIKey, chkPassReq)
            .then(resp => {
                if (resp.data.error) {
                    this.setState({
                        errorMsg: resp.data.error.errorMessage,
                        successMsg: ''
                    });
                }
                else {
                    const chgPassReq = {
                        idToken: this.props.token,
                        password: this.state.chgPassForm['newPass'].value,
                        returnSecureToken: false
                    };

                    axios.post('accounts:update?key=' + environment.firebaseAPIKey, chgPassReq)
                        .then(resp => {
                            if (resp.data.error) {
                                this.setState({
                                    errorMsg: resp.data.error.errorMessage,
                                    successMsg: ''
                                });
                            }
                            else {
                                this.setState({
                                    errorMsg: '',
                                    successMsg: 'The new password has been set up.'
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error.response);
                            this.markupErrorMsg(error.response.data.error.message);
                        })
                        .finally(() => {
                            this.setState({ isLoading: false });
                        });
                }
            })
            .catch(error => {
                console.log(error.response);
                this.markupErrorMsg(error.response.data.error.message);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    markupErrorMsg = (msg) => {
        switch (msg) {
            case 'INVALID_ID_TOKEN':
                this.setState({ errorMsg: 'Session Time Out. Please login again.', successMsg: '' });
                break;
            case 'EMAIL_NOT_FOUND':
                this.setState({ errorMsg: 'This email does not exist.', successMsg: '' });
                break;
            case 'INVALID_PASSWORD':
                this.setState({ errorMsg: 'This password is not correct.', successMsg: '' });
                break;
            case 'OPERATION_NOT_ALLOWED':
                this.setState({ errorMsg: 'This email is disabled.', successMsg: '' });
                break;
            case 'INVALID_OOB_CODE':
                this.setState({ errorMsg: 'The reset password link is expired.', successMsg: '' });
                break;
            case 'EXPIRED_OOB_CODE':
                this.setState({ errorMsg: 'The reset password link is invalid.', successMsg: '' });
                break;
            case 'WEAK_PASSWORD':
                this.setState({ errorMsg: 'The password must be 6 characters long or more.', successMsg: '' });
                break;
            default:              
                this.setState({ errorMsg: 'An unknown error occurred!', successMsg: '' });
        }
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
            ...this.state.chgPassForm
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
        this.setState({ chgPassForm: updatedLoginForm, formIsValid: formIsValid });
    }

    render() {
        let form = [];
        const formElementsArray = [];
        for (let key in this.state.chgPassForm) {
            formElementsArray.push({
                id: key,
                config: this.state.chgPassForm[key]
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
                <div
                    className="alert alert-success"
                    style={{ visibility: this.state.successMsg !== '' ? 'visible' : 'hidden' }}
                >
                    <p>{this.state.successMsg}</p>
                </div>,
                <form onSubmit={this.SubmitHandler}>
                    <label>Reset Password</label>
                    {formElementsArray.map(formElement => (
                        <div className="form-group">
                            <Input
                                key={formElement.id}
                                label={formElement.config.label}
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
                        <button
                            style={{ float: 'right' }}
                            className="btn btn-danger"
                            type="submit"
                            disabled={!this.state.formIsValid}
                        >
                            Submit
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

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin,
        token: state.token,
        userName: state.userName,
        email: state.email
    };
};

export default connect(mapStateToProps)(ChangePassword);