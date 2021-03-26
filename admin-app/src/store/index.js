import { createStore } from "redux";
import rootReduce from '../reducers';
import thunk from "redux-thunk";

const store = createStore(rootReduce, applyMiddleware(thunk));

export default store;