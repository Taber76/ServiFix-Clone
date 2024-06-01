/* eslint-disable @next/next/no-img-element */
'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { CheckCircle2, Star } from 'lucide-react'
import LocationIcon from '@/components/icons/LocationIcon'
import BillIcon from '@/components/icons/BillIcon'
import Filter from '@/components/Filter'

import { posts } from '@/lib/data'


const Services = () => {
    const dateConverter = (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    }
    return (
        <main className='min-h-[calc(100vh-9rem-1px)] flex flex-col justify-center h-full py-12'>
            <MaxWidthWrapper>
                <div className='flex  gap-4'>
                    <aside className='min-w-[300px] lg:flex hidden'>
                        <Filter />
                    </aside>
                    <main className='md:bg-zinc-100 w-full items-center min-h-full gap-4 md:p-4 flex flex-col rounded-lg' >
                        <h2 className='text-3xl font-bold text-center'>{
                            posts.length > 0 && posts.length < 2 ? 'Service' : 'Services'
                        }</h2>
                        <div className='flex flex-col gap-2 md:gap-4 w-full'>


                            {
                                posts.map((post) => (
                                    <div key={crypto.randomUUID()}
                                        className='flex items-center gap-2 md:gap-4 p-2 md:p-4 bg-zinc-50 hover:shadow-md cursor-pointer rounded-lg hover:scale-[1.01] transition-all odd:bg-zinc-100 justify-between w-full shadow-md'>
                                        <div className='flex flex-row items-center gap-4 '>
                                            <div className='w-28 sm:w-40 md:w-44 h-40 flex justify-center items-center relative'>
                                                <img
                                                    src={post.url_image}
                                                    alt={post.title}
                                                    className='ring-1 ring-zinc-200 rounded-sm object-cover aspect-square' />

                                                {
                                                    post.stars > 4 && (
                                                        <div className='absolute top-2 -left-2 px-2 py-1 rounded-lg bg-lime-500/90 w-fit text-center text-xs text-white font-semibold '>
                                                            TOP RATED
                                                        </div>
                                                    )
                                                }

                                            </div>
                                            <div>
                                                <h3 className='text-lg md:text-xl font-semibold flex gap-2'>
                                                    {post.category.toUpperCase()}
                                                </h3>
                                                <p className='text-xs md:text-sm lg:text-base'>{post.title}</p>
                                                <span
                                                    className='text-xs md:text-md lg:text-base font-normal flex gap-1 items-center'>
                                                    by: {post.by} {
                                                        post.isVerified
                                                        &&
                                                        <CheckCircle2 className='fill-sky-500 stroke-white stroke-2 size-4' />
                                                    }
                                                </span>

                                                <p
                                                    className='flex gap-1 items-center text-xs md:text-base' >
                                                    <LocationIcon className={'stroke-1 stroke-green-800 md:size-5 sm:size-4 size-3'} /> {post.location}
                                                </p>
                                                <p className='flex gap-1 items-center text-xs md:text-base'><BillIcon className={'stroke-1 stroke-green-800 md:size-5 sm:size-4 size-3  '} /> from {post.price} {post.currency}</p>
                                                <div className='flex items-center'>
                                                    {
                                                        post.stars > 0 ? post.stars <= 5 && (
                                                            Array(5).fill(0).map((_, index) => (
                                                                <Star
                                                                    key={index}
                                                                    size={16}
                                                                    fill={index < post.stars ? 'gold' : 'gray'}
                                                                    className="stroke-1 stroke-zinc-500" />
                                                            )
                                                            )) :
                                                            Array(5).fill(0).map((_, index) => (
                                                                <Star
                                                                    key={index}
                                                                    size={16}
                                                                    fill="gray"
                                                                    className="stroke-1 stroke-zinc-500" />
                                                            )
                                                            )

                                                    }
                                                    {
                                                        post.reviews.length > 0 && <p className='text-sm font-light ml-2'>({post.reviews.length})</p>
                                                    }
                                                </div>

                                            </div>
                                        </div>

                                        <div className='hidden md:flex flex-col-reverse h-full gap-2 md:items-end justify-between w-fit'>
                                            <button className='bg-green-500 text-white px-4 py-2 rounded-lg w-full'>Hire now</button>
                                            <div>
                                                <p className='text-xs font-light text-end'>{`posted at ${dateConverter(post.createdAt)}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </main>

                </div>
            </MaxWidthWrapper>
        </main>
    )
}

export default Services