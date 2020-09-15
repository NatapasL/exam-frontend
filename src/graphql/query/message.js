import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  query ($roomId: String!) {
    messages(roomId: $roomId) {
      id
      body
      sender {
        id
        name
      }
    }
  }
`
