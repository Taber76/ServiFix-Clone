/* eslint-disable @next/next/no-img-element */
'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import axios from 'axios'
import { CheckCircle2, MessageSquareText, Star, VerifiedIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { type DetailedPost } from '@/types/front.types'
import { Button, Divider, Input } from '@nextui-org/react'
import { ChatDialogModal } from '@/components/ChatDialog';
import { useAuthStore } from '@/store/serviceStore'
import LocationIcon from '@/components/icons/LocationIcon'
import DetailedPostSkeleton from '@/components/DetailedPostSkeleton'


const Page = () => {
    const router = useRouter()
    const postId = useParams()?.chat
    const [post, setPost] = useState<DetailedPost | null>(null)
    const [isOpen, setIsOpen] = useState(false);
    const [recipientId, setRecipientId] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const { user } = useAuthStore(state => ({ user: state.user }));

    useEffect(() => {
        const isValidServiceId = async () => {
            try {
                const postsData = await axios.get(`/api/service/getbyserviceid?id=${postId}`)
                if (!postsData.data) {
                    router.push('/not-found')
                }
                setPost(postsData.data)
                setRecipientId(postsData.data.postedBy.id)

            } catch (error) {
                router.push('/not-found')
            }
        }
        isValidServiceId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (user) {
            setUserId(user.id)
        }
    }, [user])

    function hourConvert(time: string) {
        const date = new Date(time).toDateString()
        return date
    }

    if (!post) {
        return (
            <MaxWidthWrapper>
                <DetailedPostSkeleton />
            </MaxWidthWrapper>
        )
    }

    return (
        <MaxWidthWrapper>
            <div className='flex flex-col gap-12'>
                <section
                    className='flex flex-col min-h-[calc(100vh-9rem-1px)] lg:flex-row items-center lg:items-start justify-between gap-2'>

                    <div id='post-container' className='flex flex-col w-full lg:w-1/2 py-4 md:p-4 gap-2'>
                        <div id='user-container' className='flex w-full gap-2'>
                            <div className='size-12 shrink-0 '>
                                <img src={post?.postedBy.photo ?? '/default-picture.webp'} alt="" className='w-full aspect-square object-cover rounded-full' />
                            </div>
                            <div className='flex justify-between w-full'>
                                <div>
                                    <div className='flex gap-1 items-center'>
                                        <p className='font-semibold text-zinc-950 text-nowrap'>
                                            {`${post?.postedBy.name} ${post?.postedBy.surname}`}
                                        </p>
                                        {
                                            post?.postedBy.verified && (
                                                <CheckCircle2 className='fill-sky-500 stroke-white ring-0 stroke-2 size-4' />)
                                        }
                                    </div>
                                    <div className='flex'>
                                        {
                                            post?.postedBy.rating != null ? (post?.postedBy.rating > 0 && post?.postedBy.rating <= 5 && (
                                                Array(5).fill(0).map((_, index) => (
                                                    <Star
                                                        key={index}
                                                        size={16}
                                                        fill={post.postedBy.rating && index < post?.postedBy.rating ? 'gold' : 'gray'}
                                                        className="stroke-1 stroke-zinc-500" />
                                                )
                                                ))
                                            ) : Array(5).fill(0).map((_, index) => (
                                                <Star
                                                    key={index}
                                                    size={16}
                                                    fill="gray"
                                                    className="stroke-1 stroke-zinc-500" />)
                                            )}

                                    </div>
                                </div>
                                <p className='lg:text-sm text-xs text-zinc-900 font-light text-nowrap self-end'>Posted: {hourConvert(post?.createdAt as unknown as string)}</p>
                            </div>
                        </div>

                        <div className='w-full shadow-xl'>
                            <img src={post?.url_image} alt={post?.title} className='w-full aspect-square object-cover rounded-xl' />
                        </div>
                    </div>


                    <div id='description-container' className='lg:w-1/2 flex min-h-[450px] pt-4 md:pt-8 flex-col gap-2 items-center justify-between'>
                        <div className='w-full md:px-6 flex flex-col gap-4'>
                            <div>
                                <h1 className='text-4xl font-bold'>{post?.category}
                                </h1>
                                <div className='flex items-center text-lg'>
                                    {
                                        post?.stars != null ? (post?.stars > 0 && post?.stars <= 5 && (
                                            Array(5).fill(0).map((_, index) => (
                                                <Star
                                                    key={index}
                                                    size={24}
                                                    fill={post?.stars && index < post?.stars ? 'gold' : 'gray'}
                                                    className="stroke-1 stroke-zinc-500" />
                                            )
                                            ))
                                        ) : Array(5).fill(0).map((_, index) => (
                                            <Star
                                                key={index}
                                                size={24}
                                                fill="gray"
                                                className="stroke-1 stroke-zinc-500" />)
                                        )}

                                    {
                                        `${' '}(${post?.reviews.length})`
                                    }
                                </div>
                            </div>
                            <h1 className='text-xl flex gap-2 items-center'>{post?.city} <LocationIcon className={'stroke-2 stroke-green-800 size-5'} /></h1>
                            <h1 className='text-2xl font-bold'>{post?.title}</h1>
                            <div className='flex flex-col'>
                                <p className=''>{post?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis est atque ratione velit ducimus vel magnam explicabo modi ipsa temiquam, quas sit tempore debitis cupiditate, eius suscipit qui deserunt. Lore corrupti odit porro nobis?</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-lg font-semibold'>Services price:</h2>
                                <div className='flex gap-2'>
                                    <div
                                        className='flex cursor-pointer gap-1 rounded-md items-center border w-min text-nowrap p-2 border-zinc-400 hover:border-zinc-600 '>
                                        {post?.price} {post?.currency} Standar
                                    </div>
                                    <div className='flex cursor-pointer gap-1 rounded-md items-center border w-min text-nowrap p-2 border-zinc-400 hover:border-zinc-600 '>{(Number(post?.price) * 1.77).toFixed(1)} {post?.currency} Premium</div>
                                </div>
                            </div>
                        </div>
                        {/* <Input
                            type="text"
                            placeholder="Enter recipient ID"
                            value={recipientId}
                            onChange={(e) => setRecipientId(e.target.value)}
                        /> */}
                        <div className='w-full flex items-center justify-center'>
                            {userId == post?.postedBy.id ?
                                <Button onClick={() => router.push(`/edit-post/${post?.id}`)} className="w-1/3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150" >Edit</Button>
                                :
                                <Button onClick={() => setIsOpen(true)} className="w-1/3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150 flex-nowrap " >Chat <MessageSquareText /></Button>
                            }
                        </div>
                        <ChatDialogModal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            recipientId={Number(recipientId)}
                            serviceId={post?.id}
                        />
                    </div>
                </section>
                <section id='user-info' className='flex flex-col gap-4'>
                    <h1 className='text-2xl font-medium '>About servicer</h1>
                    <div className='flex gap-4'>
                        <div className='size-32'>
                            <img src={post?.postedBy.photo ?? '/default-picture.webp'} className='w-full ring-1 ring-green-600 aspect-square object-cover rounded-full' alt="" />
                        </div>
                        <div>

                            <div className='flex gap-2 items-start '>
                                <div className='flex gap-2 items-center'>
                                    <h2 className='text-xl'>{post?.postedBy.name} {post?.postedBy.surname}</h2>{
                                        post?.postedBy.verified && (<VerifiedIcon className='fill-sky-500 stroke-white ring-0 stroke-2 size-6' />)
                                    }
                                </div>
                            </div>

                            <p className='text-sm font-light'>Member since: {post?.postedBy.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</p>
                            <div className='flex items-center font-base'>
                                {
                                    post?.postedBy.rating != null ? (post?.postedBy.rating > 0 && post?.postedBy.rating <= 5 && (
                                        Array(5).fill(0).map((_, index) => (
                                            <Star
                                                key={index}
                                                size={24}
                                                fill={post.postedBy.rating && index < post?.postedBy.rating ? 'gold' : 'gray'}
                                                className="stroke-1 stroke-zinc-500" />
                                        )
                                        ))
                                    ) : Array(5).fill(0).map((_, index) => (
                                        <Star
                                            key={index}
                                            size={24}
                                            fill="gray"
                                            className="stroke-1 stroke-zinc-500" />)
                                    )}

                                <p className='ml-2'>5.0</p>
                            </div>
                        </div>

                    </div>


                </section>
                <section id='reviews' className='flex flex-col gap-4 pb-12'>
                    <div>
                        <p>
                            Reviews and Comentaries {' '}

                            {
                                `(${post?.reviews.length})`
                            }
                        </p>
                    </div>
                    <div className='bg-zinc-100 lg:p-2 flex flex-col gap-4 ro'>
                        {
                            post?.reviews.map((review, index) => (
                                <div key={index}>
                                    <div className='flex gap-2 py-4'>
                                        <div className='size-12 shrink-0'>
                                            <img src={review.url_image ?? '/default-picture.webp'} alt={review.by} className='w-full aspect-square object-cover rounded-full' />
                                        </div>
                                        <div>
                                            <div className='flex gap-2 items-center'>
                                                <h3 className=' font-medium'>{review.by}</h3>
                                                <h3 className=' font-light'>@{review.by.replaceAll(' ', '')}</h3>
                                            </div>
                                            <p className='text-medium font-normal'>
                                                {review.comment}
                                            </p>
                                            <div>
                                                <div className='flex items-center font-base'>
                                                    {
                                                        review.rating != null ? (review.rating > 0 && review.rating <= 5 && (
                                                            Array(5).fill(0).map((_, index) => (
                                                                <Star
                                                                    key={index}
                                                                    size={24}
                                                                    fill={review.rating && index < review.rating ? 'gold' : 'gray'}
                                                                    className="stroke-1 stroke-zinc-500" />
                                                            )
                                                            ))
                                                        ) : Array(5).fill(0).map((_, index) => (
                                                            <Star
                                                                key={index}
                                                                size={24}
                                                                fill="gray"
                                                                className="stroke-1 stroke-zinc-500" />)
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                    {
                                        post.reviews.length - 1 !== index ? <Divider /> : null
                                    }
                                </div>
                            ))}
                    </div>
                </section>
            </div>
        </MaxWidthWrapper>
    )
}

export default Page