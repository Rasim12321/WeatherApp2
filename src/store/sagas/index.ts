import { all } from "redux-saga/effects";
import { dailyForecastWatcher } from "./dailyForecat.saga";

export function* rootWatcher() {
  yield all([dailyForecastWatcher()]);
}
