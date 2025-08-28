import BasicButton from '../../assets/buttons/BasicButton';
import Styles from './ClimaApp.module.css';
import useGeolocation from '../../hooks/useGeolocation';
import useWeather from '../../hooks/useWeather';

const ClimaApp = () => {
    const { location, error, loading, getCurrentLocation } = useGeolocation();
    const { weather, weatherError, weatherLoading, refetchWeather } = useWeather(location);

    const renderLocationInfo = () => {
        if (error) return <div style={{color: 'red'}}>{error}</div>;
        if (loading) return <div>Obteniendo ubicación...</div>;
        if (location) {
            return (
                <div>
                    <div><b>Latitud:</b> {location.lat}</div>
                    <div><b>Longitud:</b> {location.lon}</div>
                </div>
            );
        }
        return <div>Haz clic en el botón para obtener tu ubicación.</div>;
    };

    const renderWeatherInfo = () => {
        if (weatherError) return <div style={{color: 'red'}}>{weatherError}</div>;
        if (weatherLoading) return <div>Cargando información del clima...</div>;
        if (weather) {
            return (
                <div>
                    <h3>🌤️ Clima actual</h3>
                    <div><b>Ciudad:</b> {weather.name}</div>
                    <div><b>Temperatura:</b> {Math.round(weather.main.temp)}°C</div>
                    <div><b>Descripción:</b> {weather.weather[0].description}</div>
                    <div><b>Humedad:</b> {weather.main.humidity}%</div>
                    <div><b>Viento:</b> {weather.wind.speed} m/s</div>
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