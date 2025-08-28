import BasicButton from '../../buttons/BasicButton';
import Styles from './GenCitas.module.css'
import { citas } from './citas';
import { useState } from 'react';

const GenCitas = () => {
    const [citaActual, setCitaActual] = useState(()=>
        citas[Math.floor(Math.random() * citas.length)]
    ) 

    const generarNuevaCita = () => {
        const nuevaCita = citas[Math.floor(Math.random() * citas.length)]
        setCitaActual(nuevaCita)
    }

    return (
        <div className={Styles.genCitas}>
            <div className={Styles.container}>
                <div className={Styles.cita}>{citaActual.cita}</div>
                <div className={Styles.autor}>{citaActual.autor}</div>
                <footer className={Styles.footer}>
                    <BasicButton
                        text="Generar cita"
                        onClick={generarNuevaCita}
                    />
                </footer>
            </div>
        </div>
    )
}

export default GenCitas;