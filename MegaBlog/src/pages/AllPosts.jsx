import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../store/postSlice'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'


function AllPosts() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    if (authStatus) {
      if (posts.length === 0) {
        service.getPosts().then((result) => {
          if (result) {
            dispatch(setPosts(result.rows))
          }
        })
      }
    }
  }, [])


  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No Blog has been posted
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }


  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts