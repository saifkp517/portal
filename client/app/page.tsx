"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {

  console.log(process.env.NEXT_PUBLIC_SERVER_DOMAIN)

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/authorize`, {
        headers: {
          "Authorization": `${token}`
        }
      })
        .then(data => {
          console.log('test');
          window.location.href = '/dashboard'
        })
        .catch(err => {
          if (err.response.data === "Forbidden")
            console.log("Log In Again")
        })
    }
    else {
      console.log("Please Log In")
    }
  }, [])



  return (

    <div className="bg-gradient-to-r from-white to-blue-200 h-auto">
      <nav className="py-8 top-0">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex font-normal">
            <img src="/logo.png" className='h-20' alt="" />
          </div>

        </div>
      </nav>

      {/* hero section */}
      <section className='flex h-screen my-20'>
        <div className="mx-auto font-bold max-w-screen-xl ">
          <p className='mb-10 text-xl text-blue-600 text-center'>PropertyVerse</p>
          <h1 className='text-center text-8xl tracking-tight leading-2 text-gray-800'>Revolutionize Property Management with Our Advanced Dashboard</h1>
          <p className='my-20 text-lg text-gray-600 tracking-wider font-semibold text-center'>Welcome to PropertyVerse's cutting-edge property management dashboard. Designed for channel partners and brokers, our platform streamlines property uploads, risk assessment, and user engagement, making your real estate operations more efficient and insightful.</p>
          <div className="flex space-x-5  justify-center">
            <button className='p-6 border bg-blue-500 border-white text-white rounded-lg hover:bg-blue-600 hover:border-transparent'>Continue as Channel Partner</button>
            <button className='p-6 border bg-white border-blue-500 text-blue-500 rounded-lg hover:bg-gray-100 hover:border-transparent'>Continue as Broker</button>
          </div>

          {/* device mockup */}
          {/* <div className="my-20">
            <div className="relative mx-auto bg-gradient-to-r from-white to-blue-200 border-blue-200 dark:border-blue-200 border-[8px] rounded-t-xl h-[360px] max-w-[800px] md:h-[480px] md:max-w-[1024px]">
              <div className="rounded-lg overflow-hidden h-full bg-white">
                Your dashboard content here
              </div>
            </div>
            <div className="relative mx-auto bg-blue-400 rounded-b-xl rounded-t-sm h-[17px] max-w-[1000px] md:h-[21px] md:max-w-[1200px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[300px] h-[8px] bg-white"></div>
            </div>
          </div> */}

        </div>
      </section>
    </div>
  );
}
