import axios from "axios";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { AsyncPaginate } from "react-select-async-paginate";
import { OnChangeValue } from "react-select";
import { Option } from "./types";
import { CityData } from "../../models/city";
import styles from "../../App.module.css";
import { Coordinates } from "../../store/types";

interface Props {
  onSearchChange: (city: Coordinates | null) => void;
}

const SearchAutocomplete = ({ onSearchChange }: Props) => {
  const { t } = useTranslation();
  const [city, setCity] = useState<Option | null>(null);

  const onSearchHandler = useCallback((city: OnChangeValue<Option, false>) => {
    setCity(city);
    if (city?.value) {
      onSearchChange(city.value);
    }
  }, []);

  const getCityOptions = useCallback(async (inputValue: string) => {
    if (inputValue) {
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
    }
    return {
      options: [],
    };
  }, []);

  return (
    <AsyncPaginate
      className={styles.autoSearch}
      placeholder={t("search.placeholder")}
      debounceTimeout={600}
      value={city}
      onChange={onSearchHandler}
      loadOptions={getCityOptions}
    />
  );
};

export default SearchAutocomplete;
