import React, { useEffect, useRef, useState } from 'react';
import styles from './AnimatedGradientBackground.module.css';
import { blobsConfig, particlesConfig } from './backgroundElements.config.js';
import ShootingStars from './ShootingStars.jsx';

// Componente reutilizable para cada elemento con efecto de paralaje
const ParallaxElement = ({ element }) => {
    const { type, className = '', style } = element;
    const elementClass = `${styles[type]} ${className}`;

    return <div className={elementClass} style={style} />;
};

const AnimatedGradientBackground = ({ children }) => {
    const backgroundRef = useRef(null);
    const [needsPermission, setNeedsPermission] = useState(false);

    useEffect(() => {
        const background = backgroundRef.current;
        if (!background) return;

        let animationFrameId;
        let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Función para actualizar el parallax
        const updateParallax = (xPercent, yPercent) => {
            cancelAnimationFrame(animationFrameId);
            
            animationFrameId = requestAnimationFrame(() => {
                background.style.setProperty('--x-offset', `${xPercent * 100}`);
                background.style.setProperty('--y-offset', `${yPercent * 100}`);
            });
        };

        // Manejo del mouse para desktop
        const handleMouseMove = (event) => {
            if (isMobile) return; // No ejecutar en móviles
            
            const { clientX, clientY } = event;
            const { innerWidth, innerHeight } = window;

            const xPercent = (clientX / innerWidth - 0.5) * -1;
            const yPercent = (clientY / innerHeight - 0.5) * -1;

            updateParallax(xPercent, yPercent);
        };

        // Manejo del acelerómetro para móviles
        const handleDeviceOrientation = (event) => {
            if (!isMobile) return; // Solo ejecutar en móviles
            
            // Normalizar los valores del acelerómetro
            // gamma: inclinación izquierda/derecha (-90 a 90)
            // beta: inclinación adelante/atrás (-180 a 180)
            const gamma = event.gamma || 0;
            const beta = event.beta || 0;
            
            // Convertir a porcentajes más suaves
            const xPercent = Math.max(-1, Math.min(1, gamma / 45)) * -0.5;
            const yPercent = Math.max(-1, Math.min(1, (beta - 90) / 45)) * -0.5;

            updateParallax(xPercent, yPercent);
        };

        // Función para solicitar permisos en iOS
        const requestOrientationPermission = async () => {
            if (isMobile && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const permission = await DeviceOrientationEvent.requestPermission();
                    if (permission === 'granted') {
                        window.addEventListener('deviceorientation', handleDeviceOrientation);
                        setNeedsPermission(false);
                    }
                } catch (error) {
                    console.log('Error solicitando permisos de orientación:', error);
                    setNeedsPermission(true);
                }
            } else if (isMobile) {
                // Para Android y otros dispositivos que no requieren permisos
                window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
        };

        // Configurar event listeners
        if (isMobile) {
            // Verificar si necesitamos solicitar permisos (iOS 13+)
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                setNeedsPermission(true);
            } else {
                requestOrientationPermission();
            }
        } else {
            window.addEventListener('mousemove', handleMouseMove);
        }

        // Hacer la función disponible globalmente para el botón
        window.requestOrientationPermission = requestOrientationPermission;

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const allElements = [...blobsConfig, ...particlesConfig];

    return (
        <div className={styles.container}>
            <ShootingStars />
            <div ref={backgroundRef} className={styles.gradientBackground}>
                {allElements.map((element, index) => {
                    // Asignamos el factor de paralaje como una variable CSS
                    const elementStyle = {
                        ...element.style,
                        '--parallax-factor': element.parallaxFactor,
                    };
                    return <ParallaxElement key={index} element={{ ...element, style: elementStyle }} />;
                })}
            </div>

            {needsPermission && (
                <button 
                    onClick={() => window.requestOrientationPermission()}
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        zIndex: 1000,
                        padding: '10px 15px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    Activar parallax con movimiento
                </button>
            )}

            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default AnimatedGradientBackground;