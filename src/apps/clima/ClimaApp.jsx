import BasicButton from '../../assets/buttons/BasicButton';
import Styles from './ClimaApp.module.css';
import useGeolocation from '../../hooks/useGeolocation';
import useWeather from '../../hooks/useWeather';

const ClimaApp = () => {
    const { location, error, loading, getCurrentLocation } = useGeolocation();
    const { weather, weatherError, weatherLoading, refetchWeather } = useWeather(location);

    // Función para obtener el ícono basado en el código del clima
    const getWeatherIcon = (weatherCode, isDay = true) => {
        const iconMap = {
            // Cielo despejado
            '01d': 'sunny.svg',
            '01n': 'moon.svg',
            // Pocas nubes
            '02d': 'partly-cloudy.svg',
            '02n': 'partly-cloudy-night.svg',
            // Nubes dispersas / rotas
            '03d': 'cloudy.svg',
            '03n': 'cloudy.svg',
            '04d': 'overcast.svg',
            '04n': 'overcast.svg',
            // Lluvia ligera
            '09d': 'drizzle.svg',
            '09n': 'drizzle.svg',
            // Lluvia
            '10d': 'rainy.svg',
            '10n': 'rainy-night.svg',
            // Tormenta
            '11d': 'thunderstorm.svg',
            '11n': 'thunderstorm.svg',
            // Nieve
            '13d': 'snowy.svg',
            '13n': 'snowy.svg',
            // Niebla
            '50d': 'foggy.svg',
            '50n': 'foggy.svg'
        };

        return iconMap[weatherCode] || 'default.svg';
    };

    const renderLocationInfo = () => {
        if (error) return <div style={{color: '#ff6b6b'}}>{error}</div>;
        if (loading) return <div>Obteniendo ubicación...</div>;
        if (location) {
            return (
                <div className={Styles.weatherCard}>
                    <div><b>Latitud:</b> {location.lat}</div>
                    <div><b>Longitud:</b> {location.lon}</div>
                </div>
            );
        }
        return <div className={Styles.placeholder}>Haz clic en el botón para obtener tu ubicación.</div>;
    };

    const renderWeatherInfo = () => {
        if (weatherError) return <div style={{color: '#ff6b6b'}}>{weatherError}</div>;
        if (weatherLoading) return <div>Cargando información del clima...</div>;
        if (weather) {
            const iconName = getWeatherIcon(weather.weather[0].icon);
            
            return (
                <div className={Styles.weatherCard}>
                    <div className={Styles.weatherHeader}>
                        <img 
                            src={`/src/assets/icons/weatherIcons/${iconName}`}
                            alt={weather.weather[0].description}
                            className={Styles.weatherIcon}
                        />
                        <span>{weather.name}</span>
                    </div>
                    
                    <div className={Styles.weatherInfo}>
                        <div className={`${Styles.weatherItem} ${Styles.temperature}`}>
                            <div className={Styles.weatherLabel}>Temperatura</div>
                            <div className={Styles.weatherValue}>{Math.round(weather.main.temp)}°C</div>
                        </div>
                        
                        <div className={Styles.weatherItem}>
                            <div className={Styles.weatherLabel}>Descripción</div>
                            <div className={Styles.weatherValue}>
                                {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
                            </div>
                        </div>
                        
                        <div className={Styles.weatherItem}>
                            <div className={Styles.weatherLabel}>Humedad</div>
                            <div className={Styles.weatherValue}>{weather.main.humidity}%</div>
                        </div>
                        
                        <div className={Styles.weatherItem}>
                            <div className={Styles.weatherLabel}>Viento</div>
                            <div className={Styles.weatherValue}>{weather.wind.speed} m/s</div>
                        </div>
                        
                        <div className={Styles.weatherItem}>
                            <div className={Styles.weatherLabel}>Sensación térmica</div>
                            <div className={Styles.weatherValue}>{Math.round(weather.main.feels_like)}°C</div>
                        </div>
                        
                        <div className={Styles.weatherItem}>
                            <div className={Styles.weatherLabel}>Presión</div>
                            <div className={Styles.weatherValue}>{weather.main.pressure} hPa</div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={Styles.clima}>
            <div>
                <BasicButton 
                    text="Permitir ubicación" 
                    onClick={getCurrentLocation}
                    disabled={loading}
                />
                {weather && (
                    <BasicButton 
                        text="Actualizar clima" 
                        onClick={refetchWeather}
                        disabled={weatherLoading}
                    />
                )}
            </div>
            <div>
                {renderLocationInfo()}
            </div>
            <div>
                {renderWeatherInfo()}
            </div>
        </div>
    );
}

export default ClimaApp;