import { Box } from '@chakra-ui/layout'
import { withUrqlClient } from 'next-urql'
import Navbar from '../components/Navbar'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'

const Index = () => {
  const [{ fetching, data }] = usePostsQuery()
  return (
    <>
      <Navbar />
      <Box my="4" maxW="5xl" mx="auto" border="1px">
        {data
          ? data.posts.map((post) => {
              return (
                <Box key={post.id}>
                  {post.title}
                  <br />
                  {post.body}
                  <hr />
                </Box>
              )
            })
          : null}
      </Box>
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
