import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql'
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache'

import theme from '../theme'
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from '../generated/graphql'

//have to understand these code here
const enhancedUpdateQuery = <Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) => {
  return cache.updateQuery(queryInput, (data) => fn(result, data as any) as any)
}

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, _, cache) => {
            enhancedUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            )
          },
          login: (_result, _, cache) => {
            enhancedUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) =>
                result.login.errors ? query : { me: result.login.user }
            )
          },
          register: (_result, _, cache) => {
            enhancedUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) =>
                result.register.errors ? query : { me: result.register.user }
            )
          },
        },
      },
    }),
    fetchExchange,
  ],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
