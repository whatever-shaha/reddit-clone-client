import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import NextLink from 'next/link'
import React from 'react'
import { AuthContainer } from '../components/AuthContainer'
import { useLoginMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { toErrorMap } from '../utils/toErrorMap'

interface loginProps {}

type userInput = {
  usernameOrEmail: string
  password: string
}

const Login: React.FC<loginProps> = ({}) => {
  const [_, loginMutation] = useLoginMutation()
  const router = useRouter()

  const handleSubmit = async (
    values: userInput,
    { setErrors }: FormikHelpers<userInput>
  ) => {
    try {
      const { data } = await loginMutation(values)
      const fetchedErrors = data?.login.errors
      const fetchedUser = data?.login.user
      if (fetchedErrors) {
        setErrors(toErrorMap(fetchedErrors))
      } else if (fetchedUser) {
        router.push('/')
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <AuthContainer title="Log in">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Field name="usernameOrEmail" id="usernameOrEmail">
              {({ field }: { field: string }) => {
                // console.log(errors)
                return (
                  <FormControl mb="4" isInvalid={!!errors.usernameOrEmail}>
                    <Input
                      id="usernameOrEmail"
                      {...field}
                      colorScheme="twitter"
                      variant="flushed"
                      placeholder="Enter your username or e-mail"
                    />
                    <FormErrorMessage>{errors.usernameOrEmail}</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>
            <Field name="password">
              {({ field }: { field: string }) => (
                <FormControl mb="4" isInvalid={!!errors.password}>
                  <Input
                    id="password"
                    {...field}
                    colorScheme="twitter"
                    type="password"
                    variant="flushed"
                    placeholder="Enter your password"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex mb={2}>
              <Button isLoading={isSubmitting} type="submit" colorScheme="cyan">
                Log in
              </Button>
              <Spacer />
              <Text color="#999" fontSize=".75rem" mt="auto" mr="4">
                Don't have an account yet? then
              </Text>
              <NextLink href="/register">
                <Button colorScheme="cyan" variant="outline">
                  Sign up
                </Button>
              </NextLink>
            </Flex>
            <Flex justifyContent="flex-end">
              <NextLink href="/password-recovery">
                <Link color="cyan.300" fontSize=".75rem">
                  Forget Your password?
                </Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Login)
