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

        const handleMouseMove = (event) => {
            // Cancelamos el frame anterior para no sobrecargar el navegador
            cancelAnimationFrame(animationFrameId);

            animationFrameId = requestAnimationFrame(() => {
                const { clientX, clientY } = event;
                const { innerWidth, innerHeight } = window;

                const xPercent = (clientX / innerWidth - 0.5) * -1;
                const yPercent = (clientY / innerHeight - 0.5) * -1;

                background.style.setProperty('--x-offset', `${xPercent * 100}`);
                background.style.setProperty('--y-offset', `${yPercent * 100}`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
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