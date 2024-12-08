import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center rounded-tl-3xl rounded-br-3xl'>
        <div className='flex-1 justify-center flex flex-col'>
                <h2 className='text-2xl'>Want to lean more about JavaScript?</h2>
                <p className='text-gray-500 my-2'>Checkout these resources with Our JavaScript Projects</p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href='https://github.com/Ayush-Anshuli' target='_blank'>Learn More</a>
                </Button>
        </div>
        <div className='p-7 flex-1'>
        <img src='https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220714150931/JavaScript-Introduction.jpg' />
        </div>
    </div>
  )
}

export default CallToAction
