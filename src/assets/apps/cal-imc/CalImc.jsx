import Styles from './CalImc.module.css'
import BasicButton from '../../buttons/BasicButton'


import React, { useState } from 'react';
const CalImc = () => {

    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);

    const calcularIMC = (peso, altura) => {
        if (altura > 0) {
            return peso / (altura * altura);
        }
        return 0;
    }

    const categoriaIMC = (imc) => {
            if (imc < 18.5) return " Bajo peso";
            if (imc < 24.9) return " Peso normal";
            if (imc < 29.9) return " Sobrepeso";
            return " Obesidad";
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        const pesoNum = parseFloat(peso);
        const alturaNum = parseFloat(altura);
        if (!isNaN(pesoNum) && !isNaN(alturaNum) && alturaNum > 0) {
            setImc(calcularIMC(pesoNum, alturaNum));
        } else {
            setImc(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={Styles.cont}>
                    <label htmlFor="peso">Peso (kg):</label>
                    <input
                        id="peso"
                        name="peso"
                        value={peso}
                        onChange={e => setPeso(e.target.value)}
                    />
                </div>
                <div className={Styles.cont}>
                    <label htmlFor="altura">Altura (m):</label>
                    <input
                        id="altura"
                        name="altura"
                        step="0.01"
                        value={altura}
                        onChange={e => setAltura(e.target.value)}
                    />
                </div>

                {imc !== null && (
                <div className={Styles.resultContainer}>
                    <h2 className={Styles.result}>Tu IMC es: {imc.toFixed(2)}</h2>
                    <h3 className={Styles.result}>Usted tiene: 
                        {categoriaIMC(imc)}
                    </h3>
                </div>
            )}

                <footer className={Styles.footer}>
                    <BasicButton
                        text="Calcular IMC"
                        onClick={handleSubmit}
                    />
                </footer>
            </form>
            
        </div>
    )

}


export default CalImc