import React from 'react';
import styles from './ShootingStars.module.css';

const ShootingStars = () => {
    // Creamos un array para generar múltiples estrellas fácilmente
    const stars = Array.from({ length: 4 });

    return (
        <div className={styles.starsContainer}>
            {stars.map((_, index) => (
                <div key={index} className={styles.star}></div>
            ))}
        </div>
    );
};

export default ShootingStars;
