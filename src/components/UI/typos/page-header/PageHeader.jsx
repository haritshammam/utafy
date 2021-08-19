import styles from './styles.module.css'

const PageHeader = ({ children }) => {
    return (
        <div>
            <h2 className={styles.header}>{children}</h2>
        </div>
    )
}

export default PageHeader
