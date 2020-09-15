import styles from './Layout.module.scss'

export const Layout = ({ children }) => {
  return (
    <div className={styles.background}>
      <img className={styles.logo} src="/logo.png" />
      <div className={styles['container-white']}>
        {children}
      </div>
    </div>
  )
}
