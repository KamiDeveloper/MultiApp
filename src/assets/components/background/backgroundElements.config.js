import styles from './AnimatedGradientBackground.module.css';

// Configuración de los blobs de color
export const blobsConfig = [
    {
        type: 'colorBlob',
        className: styles.blob1,
        parallaxFactor: 0.25,
        style: { width: '500px', height: '500px', top: '-150px', left: '-150px' },
    },
    {
        type: 'colorBlob',
        className: styles.blob2,
        parallaxFactor: 0.5,
        style: { width: '400px', height: '400px', bottom: '-100px', left: '20%' },
    },
    {
        type: 'colorBlob',
        className: styles.blob3,
        parallaxFactor: 1,
        style: { width: '350px', height: '350px', top: '10%', right: '-100px' },
    },
];


// Generación procedural de partículas
export const particlesConfig = Array.from({ length: 50 }).map(() => {
    const size = Math.random() * 3 + 1; // Tamaño entre 1px y 4px
    return {
        type: 'particle',
        parallaxFactor: Math.random() * 0.6 + 0.1, // Factor de paralaje variado
        style: {
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        },
    };
});
