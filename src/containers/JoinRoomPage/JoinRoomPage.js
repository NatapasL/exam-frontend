import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { Title } from '../../components/Title'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { ButtonGroup } from '../../components/ButtonGroup'
import styles from './JoinRoomPage.module.scss'

export const JoinRoomPage = () => {

  const handleSubmitButtonClick = () => {

  }

  return (
    <Layout>
      <div className={styles.container}>
        <Title label="เข้าร่วมแชท" />
        <div className={styles['input-container']}>
          <Input />
        </div>
        <ButtonGroup>
          <Link href="/users">
            <Button label="กลับ" type="text" />
          </Link>
          <Button label="ยืนยัน" onClick={handleSubmitButtonClick} />
        </ButtonGroup>
      </div>
    </Layout>
  )
}
