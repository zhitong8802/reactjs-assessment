const redux = require('redux');
const createStore = redux.createStore;
const initState = {
    isLogin: false
};

// Reducer
const rootReducer = (state = initState, action) => {
    if (action.type === 'LOGIN' || action.type === 'LOGOUT') {
        return {
            ...state,
            isLogin: action.isLogin
        };
    }

    return state;
};

// Store
const store = createStore(rootReducer);

// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({ type: 'LOGIN', isLogin: true });
store.dispatch({ type: 'LOGOUT', isLogin: false });
console.log(store.getState());