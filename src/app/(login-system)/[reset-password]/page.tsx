import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

const ResetPassword = () => {

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
                        >

                            <input
                                id='email-input'
                                type="text"
                                className="bg-gray-100 cursor-not-allowed text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                disabled
                                value={'example@example.com'}

                            />

                            <input
                                id='forgot-password-input'
                                type="text"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={50}
                                placeholder="Enter the code. Ex: 123456" />

                            <Button
                                type="submit"
                                // isLoading={isLoading}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150">
                                {
                                    true ? 'Sending code...' : 'Send code'
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