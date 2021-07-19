import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CAR_SELECTED } from '../../../shared/redux-action';
import './car-detail.css';

class CarDetail extends Component {
    componentDidMount() {
        if (!this.props.isLogin) {
            this.props.history.push('/Unauthorized');
        }
    }

    backToList = () => {
        this.props.onCarSelected(null);
        this.props.history.push('/Carlist');
    }

    render() {
        console.log(this.props);
        let car = null;
        
        let carInfo = this.props.carList[this.props.match.params.id];
        
        if (carInfo == null) {
            car = (
                <div className="col-xs-12">
                    <h1 style={{ color: 'red' }}>Invalid Car ID</h1>
                </div>
            );
        }
        else {
            car = (
                <div key={carInfo.id} style={{marginLeft: '180px'}}>
                    <div className="row">
                        <div className="col-xs-12">
                            <h1>{carInfo.name}</h1>
                            <br />
                            <img src={carInfo.imagePath} style={{ maxHeight: '250px' }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <table className="carlist">
                                <thead>
                                    <tr></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Description</td>
                                        <td>{carInfo.description}</td>
                                    </tr>
                                    <tr className="variance">
                                        <td colSpan="2">Variance</td>
                                    </tr>
                                    {carInfo.variance.map(variance => (
                                        <tr>
                                            <td>{variance.info}</td>
                                            <td>{variance.price.toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="btn btn-primary" type="button" onClick={this.backToList}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return car;
    }
};

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin,
        selectedCar: state.selectedCar,
        carList: state.carList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCarSelected: (carId) => dispatch({
            type: CAR_SELECTED,
            selectedCar: carId
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarDetail);