import { RootState, AppDispatch } from '../store/store';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, weatherState } from '../store/slice/weatherSlice';

const Weather = () => {
    const [city, setCity] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { temperature, condition , sunrise ,sunset, humidity, description, location, loading, error } = useSelector(weatherState);

    const handleFetchWeather = () => {
        if (city.trim()) {
            dispatch(fetchWeather(city));
            console.log(dispatch(fetchWeather(city)));
            
        }
    };
    return (
        <div>
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={handleFetchWeather} disabled={loading}>
                {loading ? 'Loading...' : 'Get Weather'}
            </button>
            {error && <p>Error: {error}</p>}
            {temperature !== 0 && !loading && (
                <div>
                    <h2>Temperature: {temperature}°C</h2>
                    <h3>Condition: {condition}</h3>
                    <h3>Sunrise:{sunrise}</h3>
                    <h3>Sunset:{sunset}</h3>
                    <h3>Humidity:{humidity}</h3>
                    <h3>Location:{location}</h3>
                    <h3>Description:{description}</h3>
                </div>
            )}
        </div>
    )
}

export default Weather

