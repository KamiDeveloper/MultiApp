import React, { useEffect, useRef } from 'react';
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

        // Manejo del toque en pantalla para móviles
        const handleTouch = (event) => {
            if (!isMobile) return; // Solo ejecutar en móviles
            
            const touch = event.touches[0] || event.changedTouches[0];
            if (!touch) return;

            const { clientX, clientY } = touch;
            const { innerWidth, innerHeight } = window;

            const xPercent = (clientX / innerWidth - 0.5) * -1;
            const yPercent = (clientY / innerHeight - 0.5) * -1;

            updateParallax(xPercent, yPercent);
        };

        // Configurar event listeners
        if (isMobile) {
            window.addEventListener('touchstart', handleTouch);
            window.addEventListener('touchmove', handleTouch);
        } else {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouch);
            window.removeEventListener('touchmove', handleTouch);
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

            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default AnimatedGradientBackground;