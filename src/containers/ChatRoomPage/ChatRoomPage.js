import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'

import { ChatBox } from '../ChatBox'
import { Title } from '../../components/Title'
import { Layout } from '../../components/Layout'
import styles from './ChatRoomPage.module.scss'
import { currentRoomState } from '../../store/state/currentRoom'

export const ChatRoomPage = () => {
  const router = useRouter()
  const currentRoom = useRecoilValue(currentRoomState)

  useEffect(() => {
    if (!currentRoom) {
      router.push('/users')
    }
  })

  if (!currentRoom) {
    return <div />
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Title label={`ห้อง ${currentRoom && currentRoom.name}`} />
        <ChatBox />
      </div>
    </Layout>
  )
}
