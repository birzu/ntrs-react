import { combineReducers } from 'redux';

import modalReducer from './modal.reducer';

const rootReducer = combineReducers({
  modal: modalReducer
});

export default rootReducer;
