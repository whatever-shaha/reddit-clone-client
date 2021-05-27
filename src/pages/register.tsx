import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Box, Center, Container, Flex, Spacer, Text } from '@chakra-ui/layout'
import { Button, Input } from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useRegisterMutation, WithEmailInput } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { toErrorMap } from '../utils/toErrorMap'

interface registerProps {}
// type userInput = {
//   username: string
//   password: string
// }
const Register: React.FC<registerProps> = ({}) => {
  const [_, registerMutation] = useRegisterMutation()
  const router = useRouter()

  const handleSubmit = async (
    values: WithEmailInput,
    { setErrors }: FormikHelpers<WithEmailInput>
  ) => {
    try {
      const { data } = await registerMutation({ options: values })
      const fetchedErrors = data?.register.errors
      const fetchedUser = data?.register.user
      if (fetchedErrors) {
        console.log('yeay')
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
          Register
        </Text>
        <Box>
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <Field name="username" id="username">
                  {({ field }: { field: string }) => {
                    // console.log(errors)
                    return (
                      <FormControl mb="4" isInvalid={!!errors.username}>
                        <Input
                          // id="username"
                          {...field}
                          colorScheme="twitter"
                          variant="flushed"
                          placeholder="Enter your username"
                        />
                        <FormErrorMessage>{errors.username}</FormErrorMessage>
                      </FormControl>
                    )
                  }}
                </Field>
                <Field name="email" id="email">
                  {({ field }: { field: string }) => {
                    // console.log(errors)
                    return (
                      <FormControl mb="4" isInvalid={!!errors.email}>
                        <Input
                          // id="email"
                          {...field}
                          colorScheme="twitter"
                          variant="flushed"
                          placeholder="Enter your e-mail"
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    )
                  }}
                </Field>
                <Field name="password" id="password">
                  {({ field }: { field: string }) => (
                    <FormControl mb="4" isInvalid={!!errors.password}>
                      <Input
                        // id="password"
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
                    Sign up
                  </Button>
                  <Spacer />
                  <Text color="#aaa" fontSize=".75rem" mt="auto" mr="4">
                    Already have an account? then
                  </Text>
                  <Button
                    onClick={() => {
                      router.push('/login')
                    }}
                    colorScheme="cyan"
                    variant="outline"
                  >
                    Log in
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Center>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Register)
