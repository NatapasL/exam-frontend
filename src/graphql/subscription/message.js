import { gql } from '@apollo/client'

export const SUBSCRIBE_MESSAGE = gql`
  subscription ($roomId: String!) {
    newMessage(roomId: $roomId) {
      id
      body
      sender {
        id
        name
      }
    }
  }
`
