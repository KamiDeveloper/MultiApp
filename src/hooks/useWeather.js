import { useState, useEffect } from 'react';

const useWeather = (location) => {
    const [weather, setWeather] = useState(null);
    const [weatherError, setWeatherError] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = async (lat, lon) => {
        if (!API_KEY) {
            setWeatherError('API key no configurada');
            return;
        }

        setWeatherLoading(true);
        setWeatherError(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
            );

            if (!response.ok) {
                throw new Error('Error al obtener datos del clima');
            }

            const data = await response.json();
            setWeather(data);
        } catch (err) {
            console.error('Error fetching weather:', err);
            setWeatherError('No se pudo obtener la información del clima');
        } finally {
            setWeatherLoading(false);
        }
    };

    // Efecto para obtener el clima automáticamente cuando cambie la ubicación
    useEffect(() => {
        if (location?.lat && location?.lon) {
            fetchWeather(location.lat, location.lon);
        }
    }, [location]);

    return { 
        weather, 
        weatherError, 
        weatherLoading, 
        refetchWeather: () => location && fetchWeather(location.lat, location.lon)
    };
};

export default useWeather;