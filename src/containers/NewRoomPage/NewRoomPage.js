import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { apolloClient } from '../../infra/apollo'
import { Layout } from '../../components/Layout'
import { Title } from '../../components/Title'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { ButtonGroup } from '../../components/ButtonGroup'
import styles from './NewRoomPage.module.scss'
import { CREATE_ROOM } from '../../graphql/mutation/room'
import { currentUserState } from '../../store/state/currentUser'
import { currentRoomState } from '../../store/state/currentRoom'

export const NewRoomPage = () => {
  const [input, setInput] = useState('')
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)
  const setCurrentRoom = useSetRecoilState(currentRoomState)

  useEffect(() => {
    if (!currentUser) {
      router.push('/')
    }
  })

  if (!currentUser) {
    return <div />
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmitButtonClick = () => {
    apolloClient.mutate({
      mutation: CREATE_ROOM,
      variables: { name: input },
      context: { headers: { userId: currentUser.id } }
    }).then(({ data: { createRoom: room } }) => {
      setCurrentRoom(room)
      router.push(`/rooms/${room.id}`)
    }).catch(() => {
      alert('Create room fail or room is already exist')
    })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles['title-container']}>
          <Title label="สร้างห้องใหม่" />
        </div>
        <div className={styles['input-container']}>
          <Input onChange={handleInputChange} />
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
