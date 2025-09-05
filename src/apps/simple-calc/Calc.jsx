import Styles from './Calc.module.css'
import { useReducer } from 'react';

/**
 * Actions define the types of updates we can perform on our state.
 */
const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
};

/**
 * The reducer function contains all the logic for our calculator.
 * It takes the current state and an action, and returns the new state.
 * @param {object} state - The current state of the calculator.
 * @param {object} action - The action to perform, with a type and an optional payload.
 * @returns {object} The new state.
 */
function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return { ...state, currentOperand: payload.digit, overwrite: false };
            }
            if (payload.digit === '0' && state.currentOperand === '0') return state;
            if (payload.digit === '.' && state.currentOperand?.includes('.')) return state;
            return { ...state, currentOperand: `${state.currentOperand || ''}${payload.digit}` };

        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state;
            }
            if (state.currentOperand == null) {
                return { ...state, operation: payload.operation };
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                };
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            };

        case ACTIONS.CLEAR:
            return {}; // Reset to an empty object, which is our initial state

        case ACTIONS.EVALUATE:
            if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
                return state;
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            };
        
        // Bonus: A delete digit function
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return { ...state, overwrite: false, currentOperand: null };
            }
            if (state.currentOperand == null) return state;
            if (state.currentOperand.length === 1) {
                return { ...state, currentOperand: null };
            }
            return { ...state, currentOperand: state.currentOperand.slice(0, -1) };

        default:
            return state;
    }
}

/**
 * Performs the calculation based on the state.
 * @param {object} state - The calculator state.
 * @returns {string} The result of the calculation.
 */
function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return '';
    let computation = '';
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
    }
    return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
});

function formatOperand(operand) {
    if (operand == null) return;
    const [integer, decimal] = operand.split('.');
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

const Calc = () => {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

    const oneToNine = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <div className={Styles.calc}>
            <div className={Styles.calcContainer}>
                <header className={Styles.calcHeader}>
                    <div className={Styles.calcScreen}>
                        <div className={Styles.previousOperand}>{formatOperand(previousOperand)} {operation}</div>
                        <div className={Styles.currentOperand}>{formatOperand(currentOperand)}</div>
                    </div>
                </header>
                <div className={Styles.calcButtonContainer}>
                    <div className={Styles.calcButtonsLeft}>
                        <div className={Styles.calcButtonsRow}>
                            {oneToNine.map(num => (
                                <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: String(num) } })} key={num} className={Styles.calcButton}>{num}</button>
                            ))}
                        </div>
                        <div className={Styles.calcButtonsLeftBottom}>
                            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '0' } })} className={`${Styles.calcButton} ${Styles.calcButtonZero}`}>0</button>
                            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '.' } })} className={`${Styles.calcButton} ${Styles.calcButtonDot}`}>.</button>
                        </div>
                    </div>
                    <div className={Styles.calcButtonsRight}>
                        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '/' } })} className={`${Styles.calcButton} ${Styles.calcButtonDivide}`}>/</button>
                        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} className={`${Styles.calcButton} ${Styles.calcButtonC}`}>C</button>
                        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '*' } })} className={`${Styles.calcButton} ${Styles.calcButtonMultiply}`}>*</button>
                        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })} className={`${Styles.calcButton} ${Styles.calcButtonPercent}`}>DEL</button>
                        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '+' } })} className={`${Styles.calcButton} ${Styles.calcButtonAdd}`}>+</button>
                        <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className={`${Styles.calcButton} ${Styles.calcButtonEqual}`}>=</button>
                        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '-' } })} className={`${Styles.calcButton} ${Styles.calcButtonSubtract}`}>-</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calc