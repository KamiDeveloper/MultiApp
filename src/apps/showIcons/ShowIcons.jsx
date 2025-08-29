import { useState } from 'react';
import Styles from './ShowIcons.module.css';

const ShowIcons = () => {
    const [selectedWeatherCode, setSelectedWeatherCode] = useState('01d');

    // Misma función que en la app del clima
    const getWeatherIcon = (weatherCode) => {
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

        return iconMap[weatherCode] || 'default.svg';
    };

    // Lista de opciones de clima
    const weatherOptions = [
        { code: '01d', name: 'Soleado (día)', description: 'Cielo despejado' },
        { code: '01n', name: 'Luna (noche)', description: 'Cielo despejado' },
        { code: '02d', name: 'Parcialmente nublado (día)', description: 'Pocas nubes' },
        { code: '02n', name: 'Parcialmente nublado (noche)', description: 'Pocas nubes' },
        { code: '03d', name: 'Nublado (día)', description: 'Nubes dispersas' },
        { code: '03n', name: 'Nublado (noche)', description: 'Nubes dispersas' },
        { code: '04d', name: 'Muy nublado (día)', description: 'Nubes rotas' },
        { code: '04n', name: 'Muy nublado (noche)', description: 'Nubes rotas' },
        { code: '09d', name: 'Llovizna (día)', description: 'Lluvia ligera' },
        { code: '09n', name: 'Llovizna (noche)', description: 'Lluvia ligera' },
        { code: '10d', name: 'Lluvia (día)', description: 'Lluvia' },
        { code: '10n', name: 'Lluvia (noche)', description: 'Lluvia' },
        { code: '11d', name: 'Tormenta (día)', description: 'Tormenta eléctrica' },
        { code: '11n', name: 'Tormenta (noche)', description: 'Tormenta eléctrica' },
        { code: '13d', name: 'Nieve (día)', description: 'Nevando' },
        { code: '13n', name: 'Nieve (noche)', description: 'Nevando' },
        { code: '50d', name: 'Niebla (día)', description: 'Neblina' },
        { code: '50n', name: 'Niebla (noche)', description: 'Neblina' }
    ];

    const selectedOption = weatherOptions.find(option => option.code === selectedWeatherCode);
    const iconName = getWeatherIcon(selectedWeatherCode);

    return (
        <div className={Styles.container}>
            
            <div className={Styles.selectorContainer}>
                <label className={Styles.label}>Selecciona un tipo de clima:</label>
                <select 
                    className={Styles.selector}
                    value={selectedWeatherCode}
                    onChange={(e) => setSelectedWeatherCode(e.target.value)}
                >
                    {weatherOptions.map((option) => (
                        <option key={option.code} value={option.code}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={Styles.iconDisplay}>
                <div className={Styles.iconContainer}>
                    <img 
                        src={`src/assets/icons/weatherIcons/${iconName}`}
                        alt={selectedOption?.description}
                        className={Styles.weatherIcon}
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/></svg>';
                        }}
                    />
                </div>
                
                <div className={Styles.iconInfo}>
                    <h3 className={Styles.iconTitle}>{selectedOption?.name}</h3>
                    <p className={Styles.iconDescription}>{selectedOption?.description}</p>
                    <p className={Styles.iconCode}>Código: {selectedWeatherCode}</p>
                    <p className={Styles.iconFile}>Archivo: {iconName}</p>
                </div>
            </div>

            <div className={Styles.allIconsGrid}>
                <h3 className={Styles.gridTitle}>Todos los iconos disponibles:</h3>
                <div className={Styles.iconGrid}>
                    {weatherOptions.map((option) => (
                        <div 
                            key={option.code} 
                            className={`${Styles.iconGridItem} ${option.code === selectedWeatherCode ? Styles.selected : ''}`}
                            onClick={() => setSelectedWeatherCode(option.code)}
                        >
                            <img 
                                src={`src/assets/icons/weatherIcons/${getWeatherIcon(option.code)}`}
                                alt={option.description}
                                className={Styles.gridIcon}
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/></svg>';
                                }}
                            />
                            <span className={Styles.gridLabel}>{option.code}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowIcons;