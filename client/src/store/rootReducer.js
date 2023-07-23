// src/reducers/index.js

import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import dataReducer from "./dataSlice"
import cardReducer from './cardSlice';
const rootReducer = combineReducers({
  cartReducer: cartReducer,
  dataReducer:dataReducer,
  card: cardReducer
});

export default rootReducer;