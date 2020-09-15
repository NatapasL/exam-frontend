import Link from 'next/link'

import { Layout } from '../../components/Layout'
import { Title } from '../../components/Title'
import { Button } from '../../components/Button'
import styles from './UserPage.module.scss'

export const UserPage = () => {
  const userName = 'Golf'

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles['title-container']}>
          <Title label={`คุณ ${userName}`} />
        </div>
        <div className={styles['create-room-button-container']}>
          <Link href="/rooms/new">
            <Button label="สร้างห้องใหม่" size="big" />
          </Link>
        </div>
        <Link href="/rooms/join">
          <Button label="เข้าร่วมแชท" type="text" />
        </Link>
      </div>
    </Layout>
  )
}
