import {combineReducers} from 'redux';
import ingredientsReducer from './ingredientsReducer';
import orders from './order';
import authReducer from '../reducers/auth';
export default combineReducers({
    ingredients : ingredientsReducer,
    orders : orders,
    authReducer : authReducer
})