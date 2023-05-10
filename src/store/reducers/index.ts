import { combineReducers } from "redux";
import dailyForecastReducer from "./dailyForecast.reducer";

export const rootReducer = combineReducers<any>({
  dailyForecastData: dailyForecastReducer,
});
