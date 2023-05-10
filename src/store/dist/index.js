"use strict";
// import { composeWithDevTools } from 'redux-devtools-extension'
// import createSagaMiddleware from 'redux-saga'
// import {applyMiddleware, createStore} from 'redux'
// import axios from 'axios'
// import { rootReducer } from './reducers'
exports.__esModule = true;
// const configureStore = () => {
//     const saga = createSagaMiddleware()
//     const composedMiddleware = composeWithDevTools(
//         applyMiddleware(saga)
//     )
//     const store = createStore(rootReducer, composeWithDevTools)
//     saga.run(rootSaga)
//     return store
// }
// export default configureStore
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_saga_1 = require("redux-saga");
var reducers_1 = require("./reducers");
var sagas_1 = require("./sagas");
var axios_1 = require("axios");
var sagaMiddleware = redux_saga_1["default"]();
var composeEnhancers = redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(sagaMiddleware));
var store = redux_1.createStore(reducers_1.rootReducer, composeEnhancers);
axios_1["default"].defaults.baseURL = "https://api.openweathermap.org/data/2.5";
axios_1["default"].defaults.params = {};
axios_1["default"].defaults.params["appid"] = "69a728415656716e7e146ac6e5dc7c8e";
sagaMiddleware.run(sagas_1.rootWatcher);
exports["default"] = store;
