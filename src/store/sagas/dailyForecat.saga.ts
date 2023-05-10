import { takeLatest, put, PutEffect } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import * as toastr from "toastr";
import { GET_DAILY_FORECAST } from "../actions/actionTypes";
import {
  setLoading,
  setdailyForecast,
} from "../reducers/dailyForecast.reducer";
import { v4 as uuidv4 } from "uuid";
import { Coordinates } from "../types";
import { AnyAction } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";

interface CityWeatherModel {
  data: {
    city: any;
    list: {
      name: string;
      main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
      };
      weather: { main: string; icon: string }[];
      coord: Coordinates;
      wind: {
        speed: number;
      };
    }[];
  };
}

function* dailyForecastWorker({
  payload,
}: PayloadAction<Coordinates>): Generator<
  Promise<AxiosResponse<CityWeatherModel>> | PutEffect<AnyAction>,
  void,
  CityWeatherModel
> {
  try {
    yield put(setLoading(true));
    const { data } = yield axios.get("/forecast", {
      params: {
        lat: payload.lat,
        lon: payload.lon,
        units: "metric",
      },
    });
    const currentWeather = {
      temp: Math.round(data.list[0].main.temp),
      main: data.list[0].weather[0].main,
      icon: data.list[0].weather[0].icon,
      feels_like: Math.round(data.list[0].main.feels_like),
      wind: Math.round(data.list[0].wind.speed),
      humidity: data.list[0].main.humidity,
      pressure: data.list[0].main.pressure,
    };
    const list = data.list.map((item) => Math.round(item.main.temp));

    yield put(
      setdailyForecast({
        city: { name: data.city.name, country: data.city.country },
        list,
        currentWeather,
        id: uuidv4(),
        unit: "metric",
      })
    );
    yield put(setLoading(false));
  } catch (error: any) {
    toastr.error(error.message);
    yield put(setLoading(false));
  }
}

export function* dailyForecastWatcher() {
  yield takeLatest(GET_DAILY_FORECAST, dailyForecastWorker);
}
