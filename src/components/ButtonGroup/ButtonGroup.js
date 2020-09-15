import styles from './ButtonGroup.module.scss'

export const ButtonGroup = ({ children }) => {
  return (
    <div className={styles['button-group']}>
      {children}
    </div>
  )
}
