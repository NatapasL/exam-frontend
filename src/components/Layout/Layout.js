import styles from './Layout.module.scss'

export const Layout = ({ children }) => {
  return (
    <div className={styles.background}>
      <div className={styles['container-white']}>
        {children}
      </div>
    </div>
  )
}
