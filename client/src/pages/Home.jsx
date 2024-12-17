import React from 'react'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard'
import CallToAction from '../components/CallToAction'
import { Button } from 'flowbite-react';

function Home() {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Code Craft blog<br/> Where Creativity Soars and Ideas Come to Life . . .</h1>
    
        <p className='text-gray-500 text-xs sm:text-sm'>We're thrilled to have you visit our little corner of 
          the internet. Here, you'll find a curated collection of
           ideas, stories, and insights designed to inspire, educate, 
           and entertain. Whether you're here to explore new perspectives,
            gain practical tips, or simply unwind with some engaging reads, 
            we aim to make your time worthwhile. Dive into our latest 
            posts, leave a comment, or share your thoughts—because your presence
             and voice are what make this space vibrant and meaningful. Happy reading</p>
      
             <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline max-w-40' >
              <Button gradientDuoTone='purpleToPink' outline className='w-full'>View All Posts</Button>
        </Link>

      </div>
        
        <div className='p-5 m-5 bg-amber-100 dark:bg-slate-700'>
        <CallToAction className='rounded'/>
      </div>

      <div className='max-w-700px mx-auto ml-10 p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4 '>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home