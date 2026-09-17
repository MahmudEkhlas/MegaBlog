import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../store/postSlice'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

function Home() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authStatus) {
            service.getPosts().then((posts) => {
                if (posts) {
                    dispatch(setPosts(posts.rows))
                }
            })
        }
    }, [])

    if (authStatus === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400">
                                Login to read the posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400">
                                No posts have been posted yet
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

export default Home