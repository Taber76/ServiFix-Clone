import { Skeleton } from '@nextui-org/react'
import React from 'react'

const DetailedPostSkeleton = () => {
    return (
        <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-3 p-2">
            <div className='flex flex-col w-full items-center lg:w-1/2 py-4 md:p-4 gap-2'>
                <div className='flex w-full gap-2 items-center'>
                    <div className='flex items-center'>
                        <Skeleton className="size-12 rounded-full mb-6 self-center" />
                    </div>
                    <div className='flex flex-col w-full gap-2 justify-center'>
                        <Skeleton className="h-4 w-1/5 rounded-lg" />
                        <Skeleton className="h-2 w-1/6 rounded-lg" />
                    </div>
                </div>
                <Skeleton className="flex rounded-lg size-64 md:size-[500px]" />
            </div>

            <div className="w-full flex flex-col items-start justify-center gap-3 px-4">
                <Skeleton className="h-8 w-2/5 rounded-lg" />
                <Skeleton className="h-6 w-3/5 rounded-lg" />
                <div className='flex flex-col w-full gap-2 mt-12'>
                    <Skeleton className="h-3 w-8/12 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                    <Skeleton className="h-3 w-8/12 rounded-lg" />
                </div>

                <div className='flex w-full gap-4 mt-12'>
                    <Skeleton className="h-8 w-1/3 rounded-lg" />
                    <Skeleton className="h-8 w-1/3 rounded-lg" />
                </div>

                <Skeleton className="h-8 w-1/3 rounded-lg self-center mt-8" />
            </div>
        </div>
    )
}

export default DetailedPostSkeleton