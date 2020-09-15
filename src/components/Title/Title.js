import styles from './Title.module.scss'

export const Title = ({ label }) => {
  return (
    <h1 className={styles.Title}>
      {label}
    </h1>
  )
}
