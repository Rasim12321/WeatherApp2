import axios from "axios";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { AsyncPaginate } from "react-select-async-paginate";
import { OnChangeValue } from "react-select";
import { Option } from "./types";
import { CityData } from "../../models/city";
import styles from "../../App.module.css";
import { Coordinates } from "../../store/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface Props {
  onSearchChange: (city: Coordinates | null) => void;
}

const SearchAutocomplete = ({ onSearchChange }: Props) => {
  const { t } = useTranslation();
  const [city, setCity] = useState<Option | null>(null);
  const { dailyForecast } = useTypedSelector(
    (state) => state.dailyForecastData
  );

  let data =
    dailyForecast[0] !== undefined
      ? dailyForecast[0].city.name + " " + dailyForecast[0].city.country
      : null;

  const onSearchHandler = useCallback(
    (city: OnChangeValue<Option, false>) => {
      setCity(city);
      if (city?.value) {
        onSearchChange(city.value);
      }
    },
    [data]
  );

  const getCityOptions = useCallback(async (inputValue: string) => {
    if (inputValue) {
      try {
        const { data }: { data: CityData } = await axios.get("/find", {
          params: { q: inputValue },
        });

        return {
          options: data.list.map((city) => {
            return {
              label: `${city.name} ${city.sys.country}`,
              value: { lat: city.coord.lat, lon: city.coord.lon },
            };
          }),
        };
      } catch (error) {}
    }
    return {
      options: [],
    };
  }, []);

  return (
    <AsyncPaginate
      className={styles.autoSearch}
      placeholder={data || t("search.placeholder")}
      debounceTimeout={600}
      value={city}
      onChange={onSearchHandler}
      loadOptions={getCityOptions}
    />
  );
};

export default SearchAutocomplete;
