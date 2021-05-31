import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { AuthContainer } from '../../components/AuthContainer'
import {
  ChangePasswordInput,
  useIsTokenValidQuery,
  usePasswordChangeMutation,
} from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { toErrorMap } from '../../utils/toErrorMap'

interface ChangePasswordProps {
  token: string
}

const ChangePassword: NextPage<ChangePasswordProps> = ({ token }) => {
  const router = useRouter()
  const [{ fetching: validating, data }] = useIsTokenValidQuery({
    variables: { token },
  })

  const [{ fetching }, passwordChangeMutation] = usePasswordChangeMutation()

  const handleSubmit = async (
    values: ChangePasswordInput,
    { setErrors }: FormikHelpers<ChangePasswordInput>
  ) => {
    try {
      const { data } = await passwordChangeMutation({
        options: { ...values, token },
      })
      const fetchedErrors = data?.passwordChange.errors
      const fetchedUser = data?.passwordChange.user
      if (fetchedErrors) {
        setErrors(toErrorMap(fetchedErrors))
      } else if (fetchedUser) {
        router.push('/')
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  if (validating) {
    return (
      <Center mt="20%">
        <Spinner thickness="3px" color="cyan" size="xl" />
      </Center>
    )
  }

  if (!data?.isTokenValid) {
    return (
      <Center mt="10%" color="coral">
        <Text fontSize="2xl">
          Your confirmation URL, sent to Your e-mail is not valid!
        </Text>
      </Center>
    )
  }

  return (
    <AuthContainer title="Password Change">
      <Formik
        initialValues={{ newPassword: '', repeatNewPassword: '' }}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form>
            <Field name="newPassword" id="newPassword">
              {({ field }: { field: string }) => {
                // console.log(errors)
                return (
                  <FormControl mb="4" isInvalid={!!errors.newPassword}>
                    <Input
                      // type=
                      id="newPassword"
                      type="password"
                      {...field}
                      colorScheme="twitter"
                      variant="flushed"
                      placeholder="Enter your new password"
                    />
                    <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>
            <Field name="repeatNewPassword">
              {({ field }: { field: string }) => (
                <FormControl mb="4" isInvalid={!!errors.repeatNewPassword}>
                  <Input
                    id="repeatNewPassword"
                    {...field}
                    colorScheme="twitter"
                    type="password"
                    variant="flushed"
                    placeholder="Repeate your new password"
                  />
                  <FormErrorMessage>{errors.repeatNewPassword}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex>
              <Button isLoading={fetching} type="submit" colorScheme="cyan">
                Change password
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  )
}

ChangePassword.getInitialProps = ({ query }) => ({
  token: query.token as string,
})

export default withUrqlClient(createUrqlClient, { ssr: false })(
  ChangePassword as any
)
