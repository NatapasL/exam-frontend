import { ApolloProvider } from '@apollo/client'
import { RecoilRoot } from 'recoil';

import { apolloClient } from '../infra/apollo'

import '../styles/global.scss'

function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default App
