'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Button } from "@nextui-org/react";



const Signup = () => {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
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
        const NAME_REGEX = /^[a-zA-Z]+$/
        const USERNAME_REGEX = /^[a-zA-Z0-9_.]{2,18}$/


        try {
            setIsLoading(true)

            if (!nameInput.value || !surnameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value || !username.value) {
                throw new Error('Please fill in all fields');
            }

            if (!NAME_REGEX.test(nameInput.value) || !NAME_REGEX.test(surnameInput.value)) {
                throw new Error('Name and surname must only contain letters');
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

            if (!USERNAME_REGEX.test(username.value)) {
                throw new Error('Invalid username, username must only contain letters, numbers, underscores, and periods. It must be between 2 and 18 characters long. Spaces are allowed. ex. John_Doe');
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                passwordInput.value = ''
                confirmPasswordInput.value = ''
                passwordInput.focus()
                throw new Error('Passwords do not match, please try again');
            }

            if (passwordInput.value.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            if (!EMAIL_REGEX.test(emailInput.value)) {
                throw new Error('Invalid email address. Please try again');
            }

            const user = {
                username: username.value,
                password: passwordInput.value,
                name: nameInput.value,
                surname: surnameInput.value,
                email: emailInput.value,
            }

            const { data, status } = await axios.post('/api/auth/register', user)

            toast({
                title: `${data.msg}`,
                variant: 'default',
                description: `Welcome ${data.user.name}!`,
            })

            if (status === 201) {
                router.push('/services')
            }
        } catch (error: any) {

            if (error.response?.data.msg) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `${error.response.data.msg}`,
                })
                return
            }
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `${error.message}`,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (

        <MaxWidthWrapper>
            <main className='flex w-full flex-row-reverse items-center justify-center lg:justify-between lg:gap-12'>
                {/* Sign up form */}
                <div className="flex w-full md:w-1/2 lg:w-2/3 flex-col items-center justify-center h-full">
                    <div className="w-full md:min-w-96 max-w-2xl bg-white rounded-lg md:shadow-md p-6">
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
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150">
                                {
                                    isLoading ? 'Loading...' : 'Sign up'
                                }
                            </Button>
                        </form>
                    </div>
                </div>

                {/* SVG for Desktop */}
                <div className=' self-end w-full hidden lg:flex'>
                    <Image src='/signup.svg' width={100} loading='eager' priority height={100} alt="how-it-works" className="w-full max-w-[800px] lg:block hidden" />
                </div>
            </main>
        </MaxWidthWrapper>


    )
}

export default Signup