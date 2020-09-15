import styles from './ChatBubble.module.scss'

export const ChatBubble = ({ body, sender }) => {
  return (
    <div className={styles.container}>
      <div className={styles['sender-name']}>คุณ {sender}</div>
      <div className={styles.bubble}>
        {body}
      </div>
    </div>
  )
}
