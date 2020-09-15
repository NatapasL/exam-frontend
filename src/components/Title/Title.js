import styles from './Title.module.scss'

export const Title = ({ label }) => {
  return (
    <h1 className={styles.title}>
      {label}
    </h1>
  )
}
