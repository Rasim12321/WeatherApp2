import SearchAutocomplete from "./components/SearchAutocomplete/SearchAutocomplete";
import { useCallback, useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import { UseActions } from "./hooks/useActions";
import { Coordinates } from "./store/types";
import { usePosition } from "./hooks/UsePosition";
function App() {
  const [searchCityCoords, setSearchCityCoords] = useState<Coordinates | null>(
    null
  );
  const { getDailyForecast } = UseActions();

  const { position } = usePosition();
  const coords: Coordinates = {
    lat: position?.coords.latitude,
    lon: position?.coords.longitude,
  };

  useEffect(() => {
    if (position) {
      setSearchCityCoords(coords);
      getDailyForecast(coords);
    }
  }, [position?.coords]);

  const onSearchChangeHanlder = useCallback((city: Coordinates | null) => {
    if (city) {
      setSearchCityCoords(city);
    }
  }, []);

  const clickHandler = () => {
    if (searchCityCoords) {
      getDailyForecast(searchCityCoords);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.search}>
          <div className={styles.indent}></div>
          <SearchAutocomplete onSearchChange={onSearchChangeHanlder} />
          <button className={styles.buttonAdd} onClick={clickHandler}>
            Add
          </button>
        </div>
        <div className={styles.container}>
          <WeatherCard />
        </div>
      </div>
    </>
  );
}

export default App;
