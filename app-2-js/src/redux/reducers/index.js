import { combineReducers } from 'redux';
import reposReducer from './reposReducer';

const reducers = combineReducers({
  repos: reposReducer,
});

export default reducers;