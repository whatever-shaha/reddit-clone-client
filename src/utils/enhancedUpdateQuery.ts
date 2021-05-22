import { QueryInput } from '@urql/exchange-graphcache'
import { Cache } from '@urql/exchange-graphcache'

//have to understand these code here
export const enhancedUpdateQuery = <Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) => {
  return cache.updateQuery(queryInput, (data) => fn(result, data as any) as any)
}
