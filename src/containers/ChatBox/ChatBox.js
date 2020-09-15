import { useEffect, useState } from 'react'
import { useSubscription, useQuery } from '@apollo/client'
import { useRecoilValue } from 'recoil'
import classnames from 'classnames'
import get from 'lodash/get'

import { apolloClient } from '../../infra/apollo'
import { ChatBubble } from '../../components/ChatBubble'
import { ChatTextArea } from '../../components/ChatTextArea'
import styles from './ChatBox.module.scss'
import { GET_MESSAGES } from '../../graphql/query/message'
import { SEND_MESSAGE } from '../../graphql/mutation/message'
import { SUBSCRIBE_MESSAGE } from '../../graphql/subscription/message'
import { currentUserState } from '../../store/state/currentUser'
import { currentRoomState } from '../../store/state/currentRoom'

export const ChatBox = () => {
  const [messages, setMessages] = useState([])
  const currentUser = useRecoilValue(currentUserState)
  const currentRoom = useRecoilValue(currentRoomState)
  const { data: getMessageData, updateQuery } = useQuery(
    GET_MESSAGES,
    {
      variables: {
        roomId: currentRoom.id
      }
    }
  )

  useSubscription(
    SUBSCRIBE_MESSAGE,
    {
      variables: {
        roomId: currentRoom.id
      },
      onSubscriptionData: ({ subscriptionData }) => {
        if (!subscriptionData.data) return

        const { newMessage } = subscriptionData.data

        setMessages([
          ...messages,
          newMessage
        ])
        updateQuery((prev) => {
          return Object.assign({}, prev, {
            messages: [
              ...prev.messages,
              newMessage
            ]
          })
        })
      }
    }
  )

  useEffect(() => {
    if (!getMessageData) return

    setMessages(getMessageData.messages)
  }, [JSON.stringify(get(getMessageData, 'messages', {}))])

  const handleSubmit = (e) => {
    const { value } = e.target
    e.target.value = ''

    apolloClient.mutate({
      mutation: SEND_MESSAGE,
      variables: {
        roomId: currentRoom.id,
        body: value
      },
      context: {
        headers: {
          userId: currentUser.id
        }
      }
    })
  }

  const bubbleContainerClassName = (message) => {
    return classnames(
      styles['bubble-container'],
      styles[`bubble-container--${
        message.sender.id === currentUser.id ? 'right' : 'left'
      }`]
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles['messages-container']}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={bubbleContainerClassName(message)}
          >
            <ChatBubble
              body={message.body}
              sender={message.sender.name}
            />
          </div>
        ))}
      </div>
      <ChatTextArea onSubmit={handleSubmit} />
    </div>
  )
}
