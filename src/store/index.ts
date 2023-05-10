import createSagaMiddleWare from "redux-saga";
import { rootReducer } from "./reducers";
import { rootWatcher } from "./sagas";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

const saga = createSagaMiddleWare();

const store = configureStore({
  reducer: rootReducer,
  middleware: [saga],
});

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";
axios.defaults.params = {
  appid: "69a728415656716e7e146ac6e5dc7c8e",
};
saga.run(rootWatcher);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
