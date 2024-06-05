'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@nextui-org/react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

const Login = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const emailInput = form.querySelector('#email-input') as HTMLInputElement
        const passwordInput = form.querySelector('#password-input') as HTMLInputElement

        const user = {
            user: emailInput.value,
            password: passwordInput.value
        }
        try {
            setIsLoading(true)
            const data = await axios.post('/api/auth/login', user)

            if (data.status === 202) {
                toast({
                    title: `Welcome back ${data.data.user.name} 👋`,
                    description: `${data.data.msg} ✅`,
                    variant: 'default'
                })
                router.push('/services')
            }

        } catch (error: any) {
            console.log(error);
            toast({
                title: 'Error',
                description: `${error.message}`,
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }


    }
    return (
        <MaxWidthWrapper>
            <main className='flex w-full  flex-row-reverse items-center justify-center lg:justify-between lg:gap-24'>
                {/* Login form */}
                <div className="flex w-full md:w-1/2 lg:w-full flex-col items-center justify-center h-full">
                    <div className="w-full md:min-w-96 max-w-2xl bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
                        <form
                            className="flex flex-col"
                            onSubmit={(e) => handleSubmit(e)}>

                            <input
                                id='email-input'
                                type="text"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={50}
                                placeholder="Email or username" />

                            <input
                                id='password-input'
                                type="password"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2  focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={50}
                                placeholder="Password" />
                            <a
                                href="/forgot-password"
                                className="text-zinc-700 hover:underline mt-2 text-xs px-1">
                                Forgot password?
                            </a>

                            <div
                                className="flex items-center justify-between gap-4 flex-wrap">

                                <p className="text-sm mt-4">
                                    Do not have an account? {' '}
                                    <a
                                        href="/signup"
                                        className="text-sm text-green-700 hover:underline mt-4">
                                        Sign up
                                    </a>
                                </p>
                            </div>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150">
                                {
                                    isLoading ? 'Loading...' : 'Login'
                                }
                            </Button>
                        </form >
                    </div>
                </div>

                {/* SVG for Desktop */}
                <div className='hidden lg:flex w-full self-end'>
                    <Image src='/login.svg' width={1000} height={100} priority loading='eager' alt="world" className="w-full aspect-square lg:block hidden" />
                </div>
            </main>
        </MaxWidthWrapper>
    )
}

export default Login