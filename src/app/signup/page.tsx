'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import axios from 'axios'
import Image from 'next/image'
import React, { FormEvent } from 'react'

const Signup = () => {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement

        const nameInput = form.querySelector('#name-input') as HTMLInputElement
        const surnameInput = form.querySelector('#surname-input') as HTMLInputElement
        const emailInput = form.querySelector('#email-input') as HTMLInputElement
        const passwordInput = form.querySelector('#password-input') as HTMLInputElement
        const confirmPasswordInput = form.querySelector('#confirm-password-input') as HTMLInputElement
        const username = form.querySelector('#username-input') as HTMLInputElement

        const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/


        try {

            if (!nameInput.value || !surnameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value || !username.value) {
                throw new Error('Please fill in all fields');
            }

            if (nameInput.value.length < 2) {
                throw new Error('Name must be at least 2 characters long');
            }

            if (surnameInput.value.length < 2) {
                throw new Error('Surname must be at least 2 characters long');
            }

            if (username.value.length < 2) {
                throw new Error('Username must be at least 2 characters long');
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                passwordInput.value = ''
                confirmPasswordInput.value = ''
                throw new Error('Passwords do not match');
            }

            if (passwordInput.value.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            if (!EMAIL_REGEX.test(emailInput.value)) {
                throw new Error('Invalid email address');
            }

            const user = {
                username: username.value,
                password: passwordInput.value,
                name: nameInput.value,
                surname: surnameInput.value,
                email: emailInput.value,
            }

            const data = await axios.post('/api/auth/register', user)

        } catch (error) {
            console.log(error);

        }




    }

    return (

        <MaxWidthWrapper>
            <main className='flex w-full flex-row-reverse items-center justify-center lg:justify-between lg:gap-12'>
                {/* Sign up form */}
                <div className="flex w-full md:w-1/2 lg:w-2/3 flex-col items-center justify-center h-full">
                    <div className="w-full md:min-w-96 max-w-2xl bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign up</h2>
                        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                            <div className='flex flex-col md:flex-row md:gap-2 w-full'>
                                <input
                                    id="name-input"
                                    type="text"
                                    className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 w-full"
                                    autoCorrect='off'
                                    autoComplete='off'
                                    spellCheck='false'
                                    maxLength={18}
                                    placeholder="Name" />
                                <input
                                    id="surname-input"
                                    type="text"
                                    className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 w-full"
                                    autoCorrect='off'
                                    autoComplete='off'
                                    spellCheck='false'
                                    maxLength={18}
                                    placeholder="Surname" />
                            </div>
                            <input
                                id="email-input"
                                type="email"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={50}
                                placeholder="Email address" />
                            <input
                                id="username-input"
                                type="text"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={18}
                                placeholder="Username" />
                            <input
                                id="password-input"
                                type="password"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={50}
                                placeholder="Password" />
                            <input
                                id="confirm-password-input"
                                type="password"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={50}
                                placeholder="Confirm Password" />
                            <div
                                className="flex items-center justify-between gap-4 flex-wrap">
                                <p
                                    className="text-gray-900 text-sm">
                                    Already have an account?{' '}
                                    <a
                                        href="/login"
                                        className="text-sm text-green-700 hover:underline mt-4">
                                        Log in
                                    </a>
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150">
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>

                {/* SVG for Desktop */}
                <div className='flex self-end '>
                    <Image src='/signup.svg' width={100} height={100} alt="how-it-works" className="w-full max-w-[800px] lg:block hidden" />
                </div>
            </main>
        </MaxWidthWrapper>


    )
}

export default Signup