
import { useState, useEffect } from 'react';
import Styles from './Carousel.module.css';
import { flechaDer, flechaIzq } from '../../icons/Icons';
import ClimaApp from '../../../apps/clima/ClimaApp';
import CalImc from '../../../apps/cal-imc/CalImc';
import GenCitas from '../../../apps/gen-citas/GenCitas';
import Calc from '../../../apps/simple-calc/Calc';

const Carousel = () => {
    // Array de aplicaciones disponibles
    const apps = [
        {
            id: 0,
            title: "Calculadora Simple",
            component: Calc
            
        },
        {
            id: 1,
            title: "Aplicación del Clima",
            component: ClimaApp
        },
        {
            id: 2,
            title: "Calculadora de IMC",
            component: CalImc
        },
        {
            id: 3,
            title: "Generador de Citas",
            component: GenCitas
        },
        {
            id: 4,
            title: "Próximamente...",
            component: null,
            placeholder: true
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const appsPerView = 2;

    // Detectar si es móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const itemsToMove = isMobile ? 1 : appsPerView;
            const newIndex = prevIndex + itemsToMove;
            return newIndex >= apps.length ? 0 : newIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const itemsToMove = isMobile ? 1 : appsPerView;
            const newIndex = prevIndex - itemsToMove;
            return newIndex < 0 ? Math.max(0, apps.length - itemsToMove) : newIndex;
        });
    };

    const visibleApps = isMobile ? 
        apps.slice(currentIndex, currentIndex + 1) : 
        apps.slice(currentIndex, currentIndex + appsPerView);

    return (
        <div className={Styles.Carousel}>

            <main className={Styles.mainContent}>
                <div className={Styles.carouselContainer}>
                    <button 
                        className={`${Styles.carouselButton} ${Styles.prevButton}`}
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                    >
                        {flechaIzq()}
                    </button>

                    <div 
                        className={Styles.appsContainer}
                    >
                        {visibleApps.map((app) => (
                            <div key={app.id} className={Styles.appCard}>
                                <h2 className={Styles.appTitle}>{app.title}</h2>
                                {app.placeholder ? (
                                    <div className={Styles.placeholder}>
                                        <p className={Styles.comingSoon}>Próximamente...</p>
                                    </div>
                                ) : (
                                    <app.component />
                                )}
                            </div>
                        ))}
                    </div>

                    <button 
                        className={`${Styles.carouselButton} ${Styles.nextButton}`}
                        onClick={nextSlide}
                        disabled={currentIndex + (isMobile ? 1 : appsPerView) >= apps.length}
                    >
                        {flechaDer()}
                    </button>
                </div>

                <div className={Styles.indicators}>
                    {Array.from({ length: Math.ceil(apps.length / (isMobile ? 1 : appsPerView)) }).map((_, index) => (
                        <button
                            key={index}
                            className={`${Styles.indicator} ${
                                Math.floor(currentIndex / (isMobile ? 1 : appsPerView)) === index ? Styles.active : ''
                            }`}
                            onClick={() => setCurrentIndex(index * (isMobile ? 1 : appsPerView))}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Carousel;