'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Filter from '@/components/Filter'
import FilteredPosts from '@/components/FilteredPosts'
import { Suspense } from 'react'
import PostSkeleton from '@/components/PostSkeleton'
const Services = () => {
    return (
        <main className='min-h-[calc(100vh-9rem-1px)] flex flex-col justify-center h-full py-12'>
            <MaxWidthWrapper>
                <div className='flex gap-4'>
                    <aside className='min-w-[300px] lg:flex hidden'>
                        <Suspense>
                            <Filter />
                        </Suspense>
                    </aside>
                    <main className='md:bg-zinc-100 w-full items-center min-h-[calc(100vh-15rem-1px)] gap-4 md:p-4 flex flex-col rounded-lg' >
                        <h2 className='text-3xl font-bold text-center'>Services</h2>
                        <div className='flex h-full flex-col gap-2 md:gap-4 w-full'>
                            {
                                <Suspense fallback={<PostSkeleton />}>
                                    <FilteredPosts />
                                </Suspense>
                            }
                        </div>
                    </main>

                </div>
            </MaxWidthWrapper>
        </main>
    )
}

export default Services