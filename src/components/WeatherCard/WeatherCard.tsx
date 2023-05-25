import styles from "./WeatherCard.module.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTranslation } from "react-i18next";
import { UseActions } from "../../hooks/useActions";

import Loading from "../Loading";
import Chart from "./Chart";
import { CityForecast } from "../../store/types";
import { useEffect, useState } from "react";
import React from "react";

const WeatherCard = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState<[] | string[]>([]);
  const [time, setTime] = useState(new Date());
  const { dailyForecast, isloading } = useTypedSelector(
    (state) => state.dailyForecastData
  );

  const { removeDailyForecast, setUnit } = UseActions();

  useEffect(() => {
    setTime(new Date());
    const toDay = time.toDateString().slice(0, 3);
    const daysArr = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sut",
      "Sun",
      "Mon",
      "Tue",
      "Wed",
    ];
    setDays(daysArr.slice(daysArr.indexOf(toDay), daysArr.indexOf(toDay) + 5));
  }, [time.getDate()]);

  if (isloading) {
    return <Loading />;
  }
  return dailyForecast.map((forecast: CityForecast) => {
    const prop = [
      {
        day: t(`card.days.${days[0]}`),
        temp:
          forecast.unit === "metric"
            ? forecast.currentWeather.temp
            : Math.round((forecast.currentWeather.temp * 9) / 5 + 32),
      },
      {
        day: t(`card.days.${days[1]}`),
        temp:
          forecast.unit === "metric"
            ? forecast.list[15]
            : Math.round((forecast.list[15] * 9) / 5 + 32),
      },
      {
        day: t(`card.days.${days[2]}`),
        temp:
          forecast.unit === "metric"
            ? forecast.list[23]
            : Math.round((forecast.list[23] * 9) / 5 + 32),
      },
      {
        day: t(`card.days.${days[3]}`),
        temp:
          forecast.unit === "metric"
            ? forecast.list[23]
            : Math.round((forecast.list[23] * 9) / 5 + 32),
      },
      {
        day: t(`card.days.${days[4]}`),
        temp:
          forecast.unit === "metric"
            ? forecast.list[23]
            : Math.round((forecast.list[23] * 9) / 5 + 32),
      },
    ];
    return (
      <div className={styles.card} key={forecast.id}>
        <div className={styles.first}>
          <div className={styles.city}>
            {forecast.city.name}, {forecast.city.country}
            <div className={styles.date}>
              {t(`card.days.${time.toDateString().slice(0, 3)}`)},
              {` ${time.getDate()} `}
              {t(`card.months.${time.toDateString().slice(4, 7)}`)},
              {` ${time.getHours()}`}:{` ${time.getMinutes()}`}
            </div>
          </div>

          <div className="d-flex">
            <div className={styles.cloud}>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.currentWeather.icon}.png`}
                alt=""
              />
              {t(`card.weather.${forecast.currentWeather.main}`)}
            </div>
            <div
              className={styles.button}
              onClick={() => {
                removeDailyForecast(forecast.id);
              }}
            >
              X
            </div>
          </div>
        </div>
        <div className={styles.forecast}>
          <Chart prop={prop} />
        </div>
        <div className={styles.currentWeather}>
          <div>
            <div className="d-flex ">
              <div className={styles.temp}>
                {forecast.currentWeather.temp > 0 ? "+" : null}
                {forecast.unit === "metric"
                  ? forecast.currentWeather.temp
                  : Math.round((forecast.currentWeather.temp * 9) / 5 + 32)}
              </div>
              <div className={styles.unit}>
                <div
                  className={
                    forecast.unit === "metric" ? "fw-bold" : "fw-light"
                  }
                  onClick={() => setUnit({ id: forecast.id, unit: "metric" })}
                >
                  °C
                </div>
                <span className="mx-1"> | </span>
                <div
                  className={
                    forecast.unit === "imperial" ? "fw-bold" : "fw-light"
                  }
                  onClick={() => setUnit({ id: forecast.id, unit: "imperial" })}
                >
                  °F
                </div>
              </div>
            </div>

            <div className={styles.feels}>
              {t("card.feelsLike")}{" "}
              {forecast.unit === "metric"
                ? forecast.currentWeather.feels_like + "°C"
                : Math.round(
                    (forecast.currentWeather.feels_like * 9) / 5 + 32
                  ) + "°F "}
            </div>
          </div>
          <div className="mr-0">
            <div>
              {t("card.wind")}:{" "}
              {forecast.unit === "metric"
                ? forecast.currentWeather.wind
                : Math.round(forecast.currentWeather.wind * 2.237)}{" "}
              {forecast.unit === "metric" ? t("card.speed") : t("card.speedI")}
            </div>
            <div>
              {t("card.humidity")}: {forecast.currentWeather.humidity}%
            </div>
            <div>
              {t("card.pressure")}: {forecast.currentWeather.pressure}{" "}
              {t("card.press")}
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default WeatherCard;
