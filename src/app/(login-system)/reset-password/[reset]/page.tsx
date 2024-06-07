'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { FormEvent, useRef, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'


const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    const isFirstTime = useRef(true)
    const emailToken = useParams()?.reset
    const { toast } = useToast()

    const CODE_REGEX = /^[0-9]{6}$/
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const codeInput = form.querySelector('#code-input') as HTMLInputElement
        const passwordInput = form.querySelector('#new-password-input') as HTMLInputElement
        const confirmPasswordInput = form.querySelector('#confirm-password-input') as HTMLInputElement

        const code = codeInput.value

        if (!CODE_REGEX.test(code)) {
            toast({
                title: 'Invalid code',
                description: 'Please enter a valid code.',
                variant: 'destructive',
            })
            return
        }

        setShowPasswordInput(true)

        if (isFirstTime.current) {
            return isFirstTime.current = false
        }

        if (!passwordInput?.value || !confirmPasswordInput?.value) {
            toast({
                title: 'Please enter a password',
                description: 'Please, do not leave the password fields empty',
                variant: 'destructive',
            })
            passwordInput?.focus()
            return
        }

        if (passwordInput?.value !== confirmPasswordInput?.value) {
            toast({
                title: 'Passwords do not match',
                description: 'Please, enter the same password in both fields',
                variant: 'destructive',
            })
            return
        }

        if (passwordInput?.value?.length < 8) {
            toast({
                title: 'Password too short',
                description: 'Password must be at least 8 characters long',
                variant: 'destructive',
            })
            return
        }

        try {
            setIsLoading(true)
            const data = await axios.post('/api/auth/resetpassword', {
                emailToken,
                key: code,
                password: passwordInput.value
            })

            if (data.status === 202) {
                toast({
                    title: 'Password changed successfully ✅',
                    description: `${data.data.msg}`,
                    variant: 'default'
                })
            }

        } catch (error: any) {
            console.log(error.response);
            if (error.response?.data.msg) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `${error.response.data.msg}`,
                })
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
            <div className="flex flex-col text-center justify-center items-center gap-2">

                <div className="flex w-full md:w-1/2 lg:w-full flex-col items-center justify-center h-full">
                    <div className="w-full md:min-w-96 max-w-xl flex gap-2 flex-col justify-center items-center bg-white rounded-lg md:shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Enter the code</h2>
                        <p className='text-gray-600 font-light text-sm'>Please enter the code that was sent to your email, check your spam folder if you do not see it</p>
                        <Image src={'/mail-sent.svg'} alt="forgotten-password" width={180} height={180} className="w-40 aspect-square" loading='eager' priority />
                        <form
                            id='forgot-password-form'
                            className="flex flex-col w-full md:w-4/5"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <input
                                id='code-input'
                                type="text"
                                className={`bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 ${showPasswordInput ? 'cursor-not-allowed' : ''}`}
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={6}
                                placeholder="Enter the code. Ex: 123456"
                                disabled={showPasswordInput}
                            />


                            {
                                !showPasswordInput ? null : (
                                    <div className='flex flex-col gap-2'>
                                        <input
                                            id='new-password-input'
                                            type="password"
                                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                            autoCorrect='off'
                                            autoComplete='off'
                                            spellCheck='false'
                                            maxLength={50}
                                            placeholder="New password" />
                                        <input
                                            id='confirm-password-input'
                                            type="password"
                                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                            autoCorrect='off'
                                            autoComplete='off'
                                            spellCheck='false'
                                            maxLength={50}
                                            placeholder="Confirm new password" />
                                    </div>
                                )
                            }

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

export default ResetPassword