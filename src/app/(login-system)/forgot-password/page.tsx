'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@nextui-org/react'
import axios from 'axios'
import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import jwt from "jsonwebtoken";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const emailInput = form.querySelector('#forgot-password-input') as HTMLInputElement

        const user = {
            email: emailInput.value
        }

        if (!emailInput.value) {
            toast({
                title: 'Error',
                description: 'Please enter an email',
                variant: 'destructive'
            })
            return
        }

        const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (!EMAIL_REGEX.test(emailInput.value)) {
            toast({
                title: 'Error',
                description: 'Please enter a valid email',
                variant: 'destructive'
            })
            return
        }


        try {
            setIsLoading(true)
            const data = await axios.post('/api/auth/forgotpassword', user)

            console.log(data)

            if (data.status === 202) {
                toast({
                    title: 'Success ✅',
                    description: `${data.data.msg}`,
                    variant: 'default'
                })
                router.push(`/reset-password/${data.data.emailHash}`)
            }

        } catch (error: any) {
            console.log(error);
            toast({
                title: 'Error ⚠️',
                description: `${error.response.data.msg}`,
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <MaxWidthWrapper>
            <div className="flex flex-col text-center justify-center items-center gap-2">

                <div className="flex w-full md:w-1/2 lg:w-full flex-col items-center justify-center h-full">
                    <div className="w-full md:min-w-96 max-w-xl flex gap-2 flex-col justify-center items-center bg-white rounded-lg md:shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Forgotten password?</h2>
                        <p className='text-gray-600 font-light text-sm'>Do not worry. Enter your email address  and we will send you a code to get back into your account.</p>
                        <Image src={'/forgotten-password.svg'} alt="forgotten-password" width={180} height={180} className="w-40 aspect-square" loading='eager' priority />
                        <form
                            id='forgot-password-form'
                            className="flex flex-col w-full md:w-4/5"
                            onSubmit={(e) => handleSubmit(e)}>

                            <input
                                id='forgot-password-input'
                                type="text"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={50}
                                placeholder="Enter your email" />

                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150">
                                {
                                    isLoading ? 'Sending code...' : 'Send code'
                                }
                            </Button>
                        </form >
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default ForgotPassword