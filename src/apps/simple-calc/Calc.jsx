import Styles from './Calc.module.css'

const Calc = () => {

    const oneToNine = Array.from({ length: 9 }, (_, i) => i + 1);


    return (
        <div className={Styles.calc}>
            <div className={Styles.calcContainer}>
            <header className={Styles.calcHeader}>
                <div className={Styles.calcScreen}>0</div>
            </header>
            <div className={Styles.calcButtonContainer}>
                <div className={Styles.calcButtonsLeft}>
                    <div className={Styles.calcButtonsRow}>
                        {oneToNine.map(num => (
                        <button key={num} className={Styles.calcButton}>{num}</button>
                    ))}
                    </div>
                    <div className={Styles.calcButtonsLeftBottom}>
                        <button className={Styles.calcButton + ' ' + Styles.calcButtonZero}>0</button>
                        <button className={Styles.calcButton + ' ' + Styles.calcButtonDot}>.</button>
                    </div>
                </div>
                <div className={Styles.calcButtonsRight}>
                    <button className={Styles.calcButton + ' ' + Styles.calcButtonDivide}>/</button>
                    <button className={Styles.calcButton + ' ' + Styles.calcButtonC}>C</button>
                    <button className={Styles.calcButton + ' ' + Styles.calcButtonMultiply}>*</button>
                    <button className={Styles.calcButton + ' ' + Styles.calcButtonPercent}>%</button>
                    <button className={Styles.calcButton + ' ' + Styles.calcButtonAdd}>+</button>
                    <button className={Styles.calcButton + ' ' + Styles.calcButtonEqual}>=</button>
                    <button className={Styles.calcButton + ' ' + Styles.calcButtonSubtract}>-</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Calc