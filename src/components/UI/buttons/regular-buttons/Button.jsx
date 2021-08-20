import styles from './styles.module.css'

const Button = ({ children, onClick, secondaryButton }) => {
    // const btnClass
    return (
        <>
            <button
                className={`
                    ${styles.button} 
                    ${secondaryButton ? styles.button_outline : null}
                `}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    )
}

export default Button
