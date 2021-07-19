import { CAR_SELECTED, LOGIN, LOGOUT, UPDATE_CAR_LIST } from "./redux-action";

const initState = {
    isLogin: false,
    token: '',
    userName: '',
    email: '',
    selectedCar: null,
    carList: []
};

const reducer = (state = initState, action) => {
    if (action.type === LOGIN) {
        return {
            ...state,
            isLogin: action.isLogin,
            token: action.token,
            userName: action.userName,
            email: action.email
        };
    }
    else if (action.type === LOGOUT) {
        return {
            initState
        };
    }
    else if (action.type === UPDATE_CAR_LIST){
        return {
            ...state,
            carList: action.carList
        }
    }
    else if (action.type === CAR_SELECTED){
        return {
            ...state,
            selectedCar: action.selectedCar
        }
    }

    return state;
};

export default reducer;