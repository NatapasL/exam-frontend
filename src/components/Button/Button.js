import { forwardRef } from 'react'
import classnames from 'classnames'

import styles from './Button.module.scss'

export const Button = forwardRef(({ label, type, size, onClick, href }, ref) => {
  const className = classnames(
    styles.button,
    {
      [styles[`button--type-${type}`]]: !!type,
      [styles[`button--size-${size}`]]: !!size,
    }
  )

  return (
    <a href={href} ref={ref} className={className} onClick={onClick}>
      {label}
    </a>
  )
})

Button.defaultProps = {
  type: 'default',
  size: 'default',
}
