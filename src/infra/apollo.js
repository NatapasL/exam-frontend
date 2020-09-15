import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const API_URL = process.env.API_URL || 'http://localhost:4000/graphql'
const SUBSCRIPTION_URL = process.env.SUBSCRIPTION_URL || 'ws://localhost:4000/graphql'

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: API_URL,
})

let splitLink
if (process.browser) {
  const wsLink = new WebSocketLink({
    uri: SUBSCRIPTION_URL,
    options: {
      reconnect: true,
    },
  })

  splitLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  )
} else {
  splitLink = httpLink
}

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache,
})
