import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query ($name: String) {
    users(name: $name) {
      id
      name
    }
  }
`
