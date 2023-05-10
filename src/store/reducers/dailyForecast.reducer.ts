import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { GET_DAILY_FORECAST } from "../actions/actionTypes";
import { CityForecast, Coordinates, Unit } from "../types";

type DailyForecastState = {
  isloading: boolean;
  dailyForecast: CityForecast[];
};

const initialState: DailyForecastState = {
  isloading: false,
  dailyForecast: [],
};

const dailyForecastReducer = createSlice({
  name: "dailyForecastReducer",
  initialState,
  reducers: {
    setdailyForecast(state, action: PayloadAction<CityForecast>) {
      return {
        ...state,
        dailyForecast: [action.payload, ...state.dailyForecast],
      };
    },
    removeDailyForecast(state, action) {
      const updatedForecasts = state.dailyForecast.filter(
        (dailyForecastItem: any) => dailyForecastItem.id !== action.payload
      );
      // return {
      //   ...state,
      //   dailyForecast: updatedForecasts,
      // };
      state.dailyForecast = updatedForecasts;
    },
    setUnit(state, action: PayloadAction<Unit>) {
      const updatedForecasts = state.dailyForecast.map(function (
        dailyForecastItem
      ) {
        if (dailyForecastItem.id === action.payload.id) {
          dailyForecastItem.unit = action.payload.unit;
          return dailyForecastItem;
        } else {
          return dailyForecastItem;
        }
      });
      console.log(updatedForecasts);

      // state.dailyForecast = updatedForecasts
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isloading = action.payload;
    },
  },
});
export const getDailyForecast = createAction<Coordinates>(GET_DAILY_FORECAST);

export const { setdailyForecast, removeDailyForecast, setUnit, setLoading } =
  dailyForecastReducer.actions;
export default dailyForecastReducer.reducer;
