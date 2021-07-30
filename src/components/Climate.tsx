import React, { useEffect, useState } from 'react'
import { Sensor } from '../lib/Sensor';

type ClimateProps = { sensor: Sensor };

function Climate({sensor}: ClimateProps) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);

  useEffect(() => {
    sensor.on('temperature', setTemperature);
    sensor.on('humidity', setHumidity);

    return () => sensor.clearListeners();
  }, [sensor]);

  return (
    <div>
      <div id="temperature">
        Temperature: {temperature ?? '-'}
      </div>

      <div id="humidity">
        Humidity: {humidity ?? '-'}
      </div>
    </div>
  );
}

export default Climate;