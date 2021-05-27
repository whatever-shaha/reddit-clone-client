import {
  Center,
  Container,
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { FormikHelpers, Formik, Form, Field } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import NextLink from 'next/link'

import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

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
    <Center h="50vh">
      <Container
        colorScheme="twitter"
        border="1px solid cyan"
        borderRadius="md"
        p="4"
      >
        <Text fontSize="xl" mb="4">
          Log in
        </Text>
        <Box>
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
                <Flex>
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
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Center>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Login)
