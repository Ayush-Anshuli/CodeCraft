import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {Button, Spinner} from 'flowbite-react'
import CallToAction from '../components/CallToAction'

function PostPage() {
    const {slug} = useParams()
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [post ,setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/post/getposts?slug=${slug}`)
                const data = await res.json()
                if(!res.ok) {
                    setError(true)
                    setLoading(false)
                    return
                }

                if(res.ok) {
                    setPost(data.posts[0])
                    setLoading(false)
                    setError(false)
                }
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchPost()
    } ,[slug])

    console.log(post)
    if(loading) return <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl'/>
    </div>

    
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl' >{post && post.title}</h1>

        <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
            <Button color='gray' >{post && post.category}</Button>
        </Link>

        <img 
            src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' 
        />
        <div className='flex justify-center border-b p-3'>
            <span>Date - {post && new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post && post.content}}>
                
        </div>
        <div className='max-w-4xl mx-auto w-full'>
            <CallToAction/>
        </div>
    </main>
  )
}

export default PostPage