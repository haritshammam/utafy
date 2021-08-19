import styles from './styles.module.css'

const PageSubheader = ({children}) => {
    return (
        <div>
            <h3 className={styles.subheader}>{children}</h3>
        </div>
    )
}

export default PageSubheader
