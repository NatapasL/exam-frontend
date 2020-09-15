import { gql } from '@apollo/client'

export const GET_ROOMS = gql`
  query ($name: String) {
    rooms(name: $name) {
      id
      name
    }
  }
`
