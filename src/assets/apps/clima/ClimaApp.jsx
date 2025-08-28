import { useState } from 'react';
import BasicButton from '../../buttons/BasicButton';
import Styles from './ClimaApp.module.css'


const ClimaApp = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const handleGetLocation = () => {
        console.log('Botón presionado');
        alert('Intentando obtener ubicación...');
        if (!navigator.geolocation) {
            setError('La geolocalización no es soportada por este navegador.');
            alert('La geolocalización no es soportada por este navegador.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Ubicación obtenida:', position);
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
                setError(null);
                alert('Ubicación obtenida correctamente.');
            },
            (err) => {
                console.error('Error obteniendo ubicación:', err);
                setError('No se pudo obtener la ubicación.');
                alert('No se pudo obtener la ubicación.');
            }
        );
    };

    const renderLocationInfo = () => {
        if (error) return <div style={{color: 'red'}}>{error}</div>;
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

    return (
        <div className={Styles.clima}>
            <div>
                <BasicButton text="Obtener ubicación" onClick={handleGetLocation} />
            </div>
            <div>
                {renderLocationInfo()}
            </div>
        </div>
    );
}

export default ClimaApp;