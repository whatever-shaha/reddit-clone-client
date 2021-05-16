import { FieldError } from '../generated/graphql'

export const toErrorMap = (errors: FieldError[]): Record<string, string> => {
  const errorMap: Record<string, string> = {}
  errors.forEach(({ field, message }) => {
    if (field === 'any') {
      errorMap.password = message
      errorMap.username = message
      return
    }
    errorMap[field] = message
  })
  console.log(errorMap)
  return errorMap
}
