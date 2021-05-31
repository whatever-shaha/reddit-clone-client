import { Button, Flex, FormControl, Input, Link, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import React from 'react'
import { AuthContainer } from '../components/AuthContainer'
import { usePasswordRecoveryMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface passwordRecoveryProps {}

type userInput = {
  usernameOrEmail: string
}

const passwordRecovery: React.FC<passwordRecoveryProps> = ({}) => {
  const toast = useToast()
  const [_, passwordRecoveryMutation] = usePasswordRecoveryMutation()

  const handleSubmit = async (values: userInput) => {
    try {
      const { data } = await passwordRecoveryMutation(values)
      if (data?.passwordRecovery) {
        toast({
          status: 'success',
          position: 'top',
          isClosable: true,
          variant: 'left-accent',
          title: 'E-mail is sent!',
        })
      } else {
        toast({
          status: 'error',
          position: 'top',
          isClosable: true,
          variant: 'left-accent',
          title: 'Something went wrong!',
        })
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <AuthContainer title="Password Recovery">
      <Formik initialValues={{ usernameOrEmail: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form>
            <Field name="usernameOrEmail" id="usernameOrEmail">
              {({ field }: { field: string }) => {
                // console.log(errors)
                return (
                  <FormControl mb="4">
                    <Input
                      id="usernameOrEmail"
                      {...field}
                      colorScheme="twitter"
                      variant="flushed"
                      placeholder="Enter your username or e-mail"
                    />
                  </FormControl>
                )
              }}
            </Field>
            <Flex mb={2}>
              <Button isLoading={isSubmitting} type="submit" colorScheme="cyan">
                Send e-mail{status}
              </Button>
            </Flex>
            <Flex justifyContent="flex-end" fontSize=".9rem" color="cyan.300">
              <NextLink href="/register">
                <Link mr="2">Register</Link>
              </NextLink>
              |
              <NextLink href="/login">
                <Link ml="2">Log in</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(passwordRecovery)
