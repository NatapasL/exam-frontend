import styles from './Input.module.scss'

export const Input = ({ onChange }) => {
  return (
    <input
      className={styles.input}
      onChange={onChange}
    />
  )
}
