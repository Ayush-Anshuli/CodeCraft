import React, { useEffect, useState } from 'react'
import {Avatar, Button, Dropdown, Navbar, TextInput} from "flowbite-react"
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { ToggleTheme } from '../redux/theme/themeSlice';
import { signoutsuccess } from '../redux/user/userSlice';


function Header() {
    const path = useLocation().pathname
    const {currentUser} = useSelector(state => state.user )

    const [serachTerm,setsearchTerm] = useState('')
    // const location = useLocation()
    const navigate = useNavigate()

    const {theme} = useSelector(state => state.theme)
    const dispatch = useDispatch()




    useEffect(() => {
            const urlParams = new URLSearchParams(location.search);
            const searchTermFromUrl = urlParams.get('serachTerm')

            if(searchTermFromUrl) {
                setsearchTerm(searchTermFromUrl)
            }
    },[location.search])

    // console.log(serachTerm)

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout',{
                method:'POST'
            })

            const data = await res.json()
            if( !res.ok ) {
                console.log(data.message)
            }else {
                dispatch(signoutsuccess())
            }
        } catch (error) {
            
        }
    }

    const handleSubmit =(e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm',serachTerm);
        const searchQuery = urlParams.toString()   /// conver the url to the string

        navigate(`/search?${searchQuery}`)
    }
    
  return (
    <>
        <Navbar className = 'border-b-2'>
            <Link to={"/"} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Code</span> Craft
            </Link>

            <form onSubmit={handleSubmit}>
                <TextInput type='text' placeholder='Search' rightIcon={FaSearch} className='hidden lg:inline' value={serachTerm} onChange={(e) => setsearchTerm(e.target.value)}/>
            </form>
          
            <Button className='w-12 h-10 lg:hidden' color='gray' pill onClick={() => navigate("/search")}>
                <FaSearch/>
            </Button>
    

            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 sm:inline' color='gray' pill onClick={() => dispatch(ToggleTheme())}>
                    {
                        theme ==='light' ? <FaMoon/> : <FaSun/>
                    }
                </Button>

                {
                    currentUser ? (
                        <Dropdown arrowIcon={false} 
                        inline label={
                        <Avatar alt='user' img={currentUser.profilePicture} rounded/>
                        }>
                            <Dropdown.Header>
                                <span className='block text-sm' >Username - {currentUser.username}</span>
                                <span className='block text-sm' >Email - {currentUser.email}</span>
                            </Dropdown.Header>

                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                        <Dropdown.Divider/>
                            <Dropdown.Item onClick={handleSignout}>
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    ):
                    
                    (
                    <Link to={'/signIn'}>
                        <Button gradientDuoTone='purpleToBlue' color='gray' outline>
                            Sign In
                        </Button>
                    </Link>
                    )
                }
                <Navbar.Toggle/>
            </div>

            <Navbar.Collapse>
                <Navbar.Link active = {path === '/'}>
                    <Link to={'/'}>Home</Link>
                </Navbar.Link>

                <Navbar.Link active = {path === '/about'}>
                    <Link to={'/about'}>About</Link>
                </Navbar.Link>

                <Navbar.Link active = {path === '/projects'}>
                    <Link to={'/projects'}>Project</Link>
                </Navbar.Link>

            </Navbar.Collapse>

        </Navbar>
    </>
  )
}

export default Header