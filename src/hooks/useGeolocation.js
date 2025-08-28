import { useState } from 'react';

const useGeolocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('La geolocalización no es soportada por este navegador.');
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
                setError(null);
                setLoading(false);
            },
            (err) => {
                console.error('Error obteniendo ubicación:', err);
                setError('No se pudo obtener la ubicación.');
                setLoading(false);
            }
        );
    };

    return { location, error, loading, getCurrentLocation };
};

export default useGeolocation;