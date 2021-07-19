import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { environment } from '../../../environment';
import { CAR_SELECTED, UPDATE_CAR_LIST } from '../../../shared/redux-action';
import CarDetail from '../car-detail/car-detail';
import './car-list.css';

class CarList extends Component {
    state = {
        tableHeader: ['Name', 'Description', 'Image', 'Price Range(RM)'],
        carList: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.isLogin) {
            this.props.history.push('/Unauthorized');
        }

        axios.get(environment.firebaseDBUrl + '/cars.json')
            .then(resp => {
                this.setState({ carList: resp.data });
                this.props.onUpdateCarList(resp.data);
            }).catch(error => {
                console.log(error.message);
            });
    }

    clickCarInfoHandler = (id) => {
        this.props.onCarSelected({id});
        this.props.history.push({
            pathname: '/Carlist/' + id
        });
    };

    render() {
        if (this.props.selectedCar != null) {
            return (<Route path={this.props.match.url + '/:id'} exact component={CarDetail} />);
        }

        return (
            <table className="carlist" style={{marginLeft: '180px'}}>
                <thead>
                    <tr>
                        {this.state.tableHeader.map(header => (<th key={header}>{header}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {this.state.carList.map(carInfo => (
                        <tr
                            key={carInfo.id}
                            onClick={() => this.clickCarInfoHandler(carInfo.id)}
                        >
                            <td>{carInfo.name}</td>
                            <td>
                                <div className="description">{carInfo.description}</div>
                            </td>
                            <td><img src={carInfo.imagePath} style={{ maxHeight: '40px' }} /></td>
                            <td>
                                <span>{carInfo.variance[1].price}</span> -
                                <span>{carInfo.variance[0].price}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
};

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin,
        selectedCar: state.selectedCar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCarList: (carList) => dispatch({
            type: UPDATE_CAR_LIST,
            carList: carList
        }),
        onCarSelected: (carId) => dispatch({
            type: CAR_SELECTED,
            selectedCar: carId
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CarList));