import { Center, Container, Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'

interface AuthContainerProps {
  title: string
}

export const AuthContainer: React.FC<AuthContainerProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Center mt="10%">
        <Container
          colorScheme="twitter"
          border="1px solid cyan"
          borderRadius="md"
          p="4"
        >
          <Text fontSize="xl" mb="4">
            {title}
          </Text>
          <Box>{children}</Box>
        </Container>
      </Center>
    </>
  )
}
