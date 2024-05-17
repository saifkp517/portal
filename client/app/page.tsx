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
    axios.get('http://localhost:8080/authorize', {
      headers: {
        "Authorization": `${token}`
      }
    })
    .then(data => {
      window.location.href = '/dashboard'
    })
      .catch(err => {
        if(err.response.data === "Forbidden")
          return;
      })
  }, [])



  return (

    <div className="bg-gray-100 font-sans leading-normal tracking-normal">

      {/* <!-- Navigation --> */}
      <nav className="bg-gray-900 p-6 fixed w-full z-10 top-0">
        <div className="text-white container mx-auto flex justify-between items-center">

          <div className="flex items-center">
            <a className="text-lg text-white font-semibold" href="#">PropertyVerse</a>
          </div>
          <div className="flex items-center">
            <a className="text-white hover:text-gray-400 mr-4" href="#">Features</a>
            <a className="text-white hover:text-gray-400 mr-4" href="#">Pricing</a>
            <a className="text-white hover:text-gray-400" href="#">Contact</a>
          </div>
        </div>
      </nav>

      {/* <!-- Hero Section --> */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md flex h-screen text-center text-white py-20">
        <div className="container m-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">Welcome to Your Dashboard</h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-12">The perfect solution for your data visualization needs</p>
          <a href="#" className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-full hover:bg-gray-300">Get Started</a>
        </div>
      </header>

      {/* <!-- Features Section --> */}
      <section className="container mx-auto my-20">
        <div className="container mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Insights at Your Fingertips</h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-6">Access real-time analytics and key performance indicators to make informed decisions.</p>
              <ul className="text-lg md:text-xl lg:text-2xl mb-6">
                <li className="flex items-center mb-3">
                  <span className="bg-yellow-500 h-2 w-3 rounded-full mr-2"></span>
                  Total Revenue Analysis: Gain insights into your total revenue trends and performance.
                </li>
                <li className="flex items-center mb-3">
                  <span className="bg-green-500 h-2 w-3 rounded-full mr-2"></span>
                  New Customers Tracking: Monitor and analyze the acquisition of new customers over time.
                </li>
                <li className="flex items-center mb-3">
                  <span className="bg-red-500 h-2 w-3 rounded-full mr-2"></span>
                  Retention Rate Analysis: Understand and optimize customer retention with retention rate metrics.
                </li>
                <li className="flex items-center mb-3">
                  <span className="bg-purple-500 h-2 w-3 rounded-full mr-2"></span>
                  Conversion Rate Monitoring: Track and improve conversion rates to maximize business growth.
                </li>
              </ul>

            </div>
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Data Visualization Made Simple</h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-6">Transform complex data into intuitive charts, graphs, and maps for easy interpretation.</p>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Sales Performance</h3>
                  <p className="text-lg">Visualize sales trends and track performance over time.</p>
                </div>
                <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md mb-8">
                  <h3 className="text-xl font-semibold mb-2">Customer Demographics</h3>
                  <p className="text-lg">Understand your customer base with demographic insights.</p>
                </div>
              </div>
              <a href="#" className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-full hover:bg-gray-300 mt-6">Start Visualizing</a>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Call to Action --> */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Sign up now and revolutionize the way you analyze and visualize your data.</p>
          <a href="/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full">Sign Up</a>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your Dashboard. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
