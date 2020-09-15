import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import get from 'lodash/get'

import { apolloClient } from '../../infra/apollo'
import { Layout } from '../../components/Layout'
import { Title } from '../../components/Title'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import styles from './HomePage.module.scss'
import { GET_USERS } from '../../graphql/query/user'
import { CREATE_USER } from '../../graphql/mutation/user'
import { currentUserState } from '../../store/state/currentUser'

export const HomePage = () => {
  const [input, setInput] = useState('')
  const setCurrentUser = useSetRecoilState(currentUserState)
  const router = useRouter()

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmitButtonClick = async () => {
    const {
      data: {
        users
      }
    } = await apolloClient.query({
      query: GET_USERS,
      variables: { name: input }
    })
    let user = users && get(users, 0)
    if (user) {
      setCurrentUser(user)
    } else {
      const {
        data: {
          createUser
        }
      } = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: { name: input }
      })
      setCurrentUser(createUser)
    }
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
