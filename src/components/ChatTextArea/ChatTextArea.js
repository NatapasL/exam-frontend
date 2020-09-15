import styles from './ChatTextArea.module.scss'

export const ChatTextArea = ({ onSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e)
    }
  }

  return (
    <div className={styles.container}>
      <textarea
        className={styles['text-area']}
        onKeyDown={handleKeyDown}
      >
      </textarea>
      <div className={styles['small-text']}>Enter เพื่อส่ง</div>
    </div>
  )
}
