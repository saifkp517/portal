'use client'
import { useState } from 'react';
import { redirect } from 'next/navigation';
import axios from 'axios';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [formError, setFormError] = useState('');

    const validateEmail = (email: string) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = () => {
        // Reset previous error messages
        setFormError('');
        setPasswordMatchError('');

        // Validation checks
        if (!email || !validateEmail(email)) {
            setFormError('Please enter a valid email');
            return;
        }

        if (!name || !password || !confirmPassword) {
            setFormError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordMatchError('Passwords do not match');
            return;
        }

        if (phone )

        // Proceed with sign-up logic
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/signup/partner`, { name, password, email })
            .then(response => {
                window.location.href = '/signin'
            })
            .catch(error => {
                console.error('Sign in error:', error);
            });
    };

    return (
        <div className="h-screen bg-gray-800 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-8 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Sign Up with PropertyVerse
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                {formError && <p className="text-red-500 mt-2">{formError}</p>}
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                    type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                    type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                    type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                {passwordMatchError && <p className="text-red-500 mt-2">{passwordMatchError}</p>}

                                <button
                                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={handleSignUp}>
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Sign Up
                                    </span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    Have an Account? <a href="/signin" className="border-b text-sm text-blue-500 font-bold border-gray-500 border-dotted">
                                        Sign In
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex-1 bg-blue-400 text-center hidden bg-cover bg-no-repeat lg:flex" style={{ backgroundImage: `url('/signin.jpg')` }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
            </div>
        </div>
    );
}
