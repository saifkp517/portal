"use client"
import { useEffect } from 'react';
import { redirect } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {


  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  useEffect(() => {
    if (user)
      redirect('/dashboard')
  }, [])

  return (

    <div className="bg-gray-100 font-sans leading-normal tracking-normal">

      {/* <!-- Navigation --> */}
      <nav className="bg-gray-900 p-6 fixed w-full z-10 top-0">
        <div className="text-white container mx-auto flex justify-between items-center">
          {
            user ?
              (
                <div className="block">
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>
              )
              :
              ' '
          }

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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-12">Features</h2>
        <div className="flex flex-wrap justify-center items-center">
          <div className="max-w-xs md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg overflow-hidden mx-6 my-4">
            <div className="px-6 py-8">
              <i className="fas fa-chart-line text-5xl text-blue-500 mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Data Visualization</h3>
              <p className="text-gray-700 leading-tight">Easily visualize your data with beautiful charts and graphs.</p>
            </div>
          </div>
          <div className="max-w-xs md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg overflow-hidden mx-6 my-4">
            <div className="px-6 py-8">
              <i className="fas fa-cogs text-5xl text-blue-500 mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Customizable</h3>
              <p className="text-gray-700 leading-tight">Tailor the dashboard to fit your specific needs and preferences.</p>
            </div>
          </div>
          <div className="max-w-xs md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg overflow-hidden mx-6 my-4">
            <div className="px-6 py-8">
              <i className="fas fa-lock text-5xl text-blue-500 mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Secure</h3>
              <p className="text-gray-700 leading-tight">Keep your data safe and secure with robust security measures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Call to Action --> */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Sign up now and revolutionize the way you analyze and visualize your data.</p>
          <a href="/api/auth/login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full">Sign Up</a>
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
