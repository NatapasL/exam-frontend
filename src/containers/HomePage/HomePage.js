import { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout'
import { Title } from '../../components/Title'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  const [input, setInput] = useState('')
  const router = useRouter()

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmitButtonClick = () => {
    // gql request
    router.push('/users')
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles['title-container']}>
          <Title label="ชื่อของคุณ" />
        </div>
        <div className={styles['input-container']}>
          <Input onChange={handleInputChange}/>
        </div>
        {input && input.length && (
          <Button
            label="ยืนยัน"
            onClick={handleSubmitButtonClick}
          />
        )}
      </div>
    </Layout>
  )
}
