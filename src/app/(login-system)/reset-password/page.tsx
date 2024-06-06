'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useRouter } from 'next/navigation'
import React from 'react'


const Page = () => {
    const router = useRouter()
    router.push('/')
    return (
        <MaxWidthWrapper>
            <div className='flex flex-col items-center justify-center'>

                <h2 className='text-xl'>Redirecting...</h2>
            </div>
        </MaxWidthWrapper>
    )
}

export default Page