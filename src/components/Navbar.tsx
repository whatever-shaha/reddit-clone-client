import { Button } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/layout'
import Link from 'next/link'
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isOnServer } from '../utils/isOnServer'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching }, logoutMutation] = useLogoutMutation()
  const [{ data }] = useMeQuery({
    pause: isOnServer(),
  })
  let body
  if (!data?.me) {
    body = (
      <Flex justifyContent="space-between">
        <Link href="/login">
          <Button px="4" mr="4" variant="ghost" color="cyan.500" colorScheme="cyan">
            Log in
          </Button>
        </Link>
        <Link href="/register">
          <Button variant="solid" colorScheme="linkedin">
            Sign up
          </Button>
        </Link>
      </Flex>
    )
  } else {
    body = (
      <Flex color="cyan.500">
        <Box alignSelf="center" mr="4">
          {data.me.username}
        </Box>
        <Button
          onClick={() => logoutMutation()}
          isLoading={fetching}
          colorScheme="red"
          variant="outline"
        >
          Log out
        </Button>
      </Flex>
    )
  }

  return (
    <Box
      // w="100%"
      // position="fixed"
      p={4}
      bgGradient="linear(to-b, blackAlpha.300, blackAlpha.500)"
    >
      <Flex justifyContent="space-between">
        <Box color={'cyan.600'}>links</Box>
        {body}
      </Flex>
    </Box>
  )
}

export default Navbar
