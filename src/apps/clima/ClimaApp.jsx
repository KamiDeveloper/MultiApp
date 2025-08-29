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
            '01d': 'day.svg',
            '01n': 'night.svg',
            // Pocas nubes
            '02d': 'cloudy-day-1.svg',
            '02n': 'cloudy-night-1.svg',
            // Nubes dispersas / rotas
            '03d': 'cloudy-day-2.svg',
            '03n': 'cloudy-night-2.svg',
            '04d': 'cloudy-day-3.svg',
            '04n': 'cloudy-night-3.svg',
            // Lluvia ligera
            '09d': 'rainy-1.svg',
            '09n': 'rainy-4.svg',
            // Lluvia
            '10d': 'rainy-2.svg',
            '10n': 'rainy-4.svg',
            // Tormenta
            '11d': 'rainy-5.svg',
            '11n': 'rainy-6.svg',
            // Nieve
            '13d': 'snowy-4.svg',
            '13n': 'snowy-5.svg',
            // Niebla
            '50d': 'cloudy.svg',
            '50n': 'cloudy.svg'
        };

        return iconMap[weatherCode] || 'day.svg';
    };

    const renderLocationInfo = () => {
        if (error) return <div style={{color: '#ff6b6b'}}>{error}</div>;
        if (loading) return <div>Obteniendo ubicación...</div>;
        // Removido: ya no mostramos las coordenadas
        return null;
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
                            src={`/weatherIcons/${iconName}`}
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
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={Styles.clima}>
            <div>
                {/* Solo mostrar el botón si no tenemos ubicación y no hay error */}
                {!location && !error && (
                    <BasicButton 
                        text="Permitir ubicación" 
                        onClick={getCurrentLocation}
                        disabled={loading}
                    />
                )}
                {weather && (
                    <BasicButton 
                        text="Actualizar clima" 
                        onClick={refetchWeather}
                        disabled={weatherLoading}
                    />
                )}
            </div>
            
            {/* Mostrar mensaje de placeholder solo si no hay ubicación, clima o error */}
            {!location && !weather && !error && !loading && (
                <div className={Styles.placeholder}>
                    Haz clic en el botón para obtener tu ubicación.
                </div>
            )}
            
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