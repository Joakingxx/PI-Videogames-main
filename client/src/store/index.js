import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer/index";
import thunk from "redux-thunk";

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSIONCOMPOSE || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
