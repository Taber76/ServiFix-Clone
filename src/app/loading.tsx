import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

const Loading = () => {
    return (
        <MaxWidthWrapper>

            <div className='w-full h-full flex items-center justify-center'>
                <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce"></div>
                    <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:-.5s]"></div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Loading