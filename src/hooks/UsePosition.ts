import { useState, useEffect } from "react";

const defaultSettings: PositionOptions = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

type Geolocation = typeof GeolocationCoordinates;

export const usePosition = (
  watch = false,
  settings = defaultSettings
): { position: GeolocationPosition; error: string | null } => {
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState<string | null>(null);
  const onChange: PositionCallback = (position) => {
    setCurrentPosition(position);
  };

  const onError: PositionErrorCallback = (positionError) => {
    setError(positionError.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    let watcher: number | null = null;
    if (watch) {
      watcher = geo.watchPosition(onChange, onError, settings);
    } else {
      geo.getCurrentPosition(onChange, onError, settings);
    }

    return () => {
      if (watcher) {
        geo.clearWatch(watcher);
      }
    };
  }, [settings]);
  // @ts-ignore
  return { position: currentPosition, error };
};
