import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from './reducers/index'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store = createStoreWithMiddleware(reducer)

export default store;
