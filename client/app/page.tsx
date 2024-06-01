"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {

  const [loggedIn, setLoggedIn] = useState(false);


  // if (isLoading) return (
  //   <div className='grid h-screen place-items-center bg-gray-700'>
  //     <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
  //       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
  //     </svg>
  //     <span className="sr-only">Loading...</span>
  //   </div>
  // )
  // if (error) return <div>{error.message}</div>;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8080/authorize', {
        headers: {
          "Authorization": `${token}`
        }
      })
        .then(data => {
          window.location.href = '/dashboard'
        })
        .catch(err => {
          if (err.response.data === "Forbidden")
            return;
        })
    }
    else
    {
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
      <section className='flex min-h-screen my-20'>
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
