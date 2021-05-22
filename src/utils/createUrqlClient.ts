import { cacheExchange } from '@urql/exchange-graphcache'
import { dedupExchange, fetchExchange } from 'urql'
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from '../generated/graphql'
import { enhancedUpdateQuery } from './enhancedUpdateQuery'

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  } as const,
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
    ssrExchange,
    fetchExchange,
  ],
})
