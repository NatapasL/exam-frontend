import { gql } from '@apollo/client'

export const SEND_MESSAGE = gql`
  mutation (
    $roomId: String!
    $body: String!
  ) {
    sendMessage(
      roomId: $roomId
      body: $body
    ) {
      id
    }
  }
`
