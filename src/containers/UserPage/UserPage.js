import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'

import { Layout } from '../../components/Layout'
import { Title } from '../../components/Title'
import { Button } from '../../components/Button'
import styles from './UserPage.module.scss'
import { currentUserState } from '../../store/state/currentUser'

export const UserPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    if (!currentUser) {
      router.push('/')
    }
  })

  if (!currentUser) {
    return <div />
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles['title-container']}>
          <Title label={`คุณ ${currentUser && currentUser.name}`} />
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
