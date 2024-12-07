import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { RiErrorWarningLine } from 'react-icons/ri'
function DashPost() {
  const { currentUser } = useSelector((state) => state.user)
  const [userPost, setUserPost] = useState([])
  const [showmore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [PostIdToDelete, setPostIdToDelete] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()

        if (res.ok) {
          setUserPost(data.posts)
          if (data.posts.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (currentUser.isAdmin) {
      fetchPost()
    }
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startindex = userPost.length
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startindex=${startindex}`)
      const data = await res.json()

      if (res.ok) {
        setUserPost((prev) => [...prev, ...data.posts])
        if (data.posts.length < 9) {
          setShowMore(false)
        }
      }

    } catch (error) {
      console.log(error)
    }
  }


  const handleDeletePost = async () => {
    // e.preventDefault()
    setShowModal(false)
    try {
      const res = await fetch(`/api/post/deletepost/${PostIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      }
      else {
        setUserPost((prev) =>
          prev.filter((post) => post._id !== PostIdToDelete))   // we are deleting the data from the array so we also need the previous data from the array,
        // this is the way we can get it and filter the array
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
         dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 mt-2 mb-5'>
        {currentUser.isAdmin &&
          userPost.length > 0 ? (
          <>
            <Table hoverable className='shadow-md '>
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {
                userPost.map((post) => (
                  <Table.Body className='divide-y' key={post._id}>
                    <Table.Row className='bg-white dark:border-gray-900 dark:bg-gray-800 text-gray-900 dark:text-white'>
                      <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>

                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img src={post.image} className='h-10 w-20 object-cover' />
                        </Link>
                      </Table.Cell>

                      <Table.Cell>
                        <Link className='text-gray-900 font-medium dark:text-white' to={`/post/${post.slug}`}>
                          {post.title}
                        </Link>
                      </Table.Cell>

                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          {post.category}
                        </Link>
                      </Table.Cell>

                      <Table.Cell>
                        <span onClick={() => { setShowModal(true); setPostIdToDelete(post._id) }} className='text-red-500 cursor-pointer font-medium hover:underline' >Delete</span>
                      </Table.Cell>

                      <Table.Cell>
                        <Link to={`/update-post/${post._id}`}>
                          <span className='text-teal-500 hover:underline font-medium '>Edit</span>
                        </Link>
                      </Table.Cell>

                    </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
            {
              showmore && (
                <button className='w-full text-teal-500 self-center text-sm py-7' onClick={handleShowMore}  >Show More</button>
              )
            }
          </>
        ) : (
          <p>You have no post yet</p>
        )
        }

        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body className='text-center h'>
            <div className='th-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto text-5xl '> <RiErrorWarningLine /> </div>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-200'>Are you sure you want to delete your account?</h3>

            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I am sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    </>
  )
}

export default DashPost