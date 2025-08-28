import Styles from './BasicButton.module.css'

const BasicButton = ({ text, onClick }) => {
    return (
        <button className={Styles.basicButton} onClick={onClick}>
            <span className={Styles.buttonText}>
                {text}
            </span>
        </button>
    )
}

export default BasicButton