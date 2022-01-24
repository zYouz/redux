import { createStore } from "redux";
import taskReducer from "./Reducers/Reducer";

const store = createStore(
	taskReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
