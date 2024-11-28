import React from 'react'
// import { Footer } from 'flowbite-react'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import {Link} from 'react-router-dom'
function Footer() {
  return (
    <>
    
     

<footer className="bg-white dark:bg-gray-900 border border-t-8 border-teal-500 ">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
          <Link to={"/"} className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>Code</span> Craft
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact us</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <span className="hover:underline">+91 82106372XX</span>
                      </li>
                      <li>
                          <span>
                            demo@gmail.com
                          </span>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="https://github.com/Ayush-Anshuli" className="hover:underline ">Github</a>
                      </li>
                      <li className="mb-4">
                          <a href="https://www.instagram.com/__ay_u_sh_8/" className="hover:underline">Instagram</a>
                      </li>

                      <li>
                          <a href="https://www.linkedin.com/in/ayush-anshuli-1a4b71246/" class="hover:underline">Linkedin</a>
                      </li>
                      
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Code Craft. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="https://github.com/Ayush-Anshuli" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <FaGithub/>
                  <span className="sr-only">Facebook page</span>
              </a>
              <a href="https://www.linkedin.com/in/ayush-anshuli-1a4b71246/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <FaLinkedin/>
              </a>
              <a href="https://www.instagram.com/__ay_u_sh_8/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <FaInstagram/>
              </a>
          </div>
      </div>
    </div>
</footer>

    </>
  )
}

export default Footer