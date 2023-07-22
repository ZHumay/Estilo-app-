// src/reducers/index.js

import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import dataReducer from "./dataSlice"

const rootReducer = combineReducers({
  cartReducer: cartReducer,
  dataReducer:dataReducer,
});

export default rootReducer;