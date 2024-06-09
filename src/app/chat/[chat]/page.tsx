/* eslint-disable @next/next/no-img-element */
'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import axios from 'axios'
import { CheckCircle2, MessageSquareText, MessageSquareTextIcon, Star, VerifiedIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { type AllPosts } from '@/services/getAllPosts'
import { Button, Divider, Input } from '@nextui-org/react'
import { ChatDialogModal } from '@/components/ChatDialog';



const Page = () => {
    const router = useRouter()
    const postId = useParams()?.chat
    const [post, setPost] = useState<AllPosts | null>(null)
    const [isOpen, setIsOpen] = useState(false);
    const [recipientId, setRecipientId] = useState('');

    useEffect(() => {
        const isValidServiceId = async () => {
            try {
                const isValidPost = await axios.get(`/api/service/getbyserviceid?id=${postId}`)
                if (!isValidPost.data) {
                    router.push('/not-found')
                }
                setPost(isValidPost.data)
                console.log(isValidPost.data);

            } catch (error) {
                router.push('/not-found')
            }
        }
        isValidServiceId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function hourConvert(time: string) {
        const date = new Date(time).toDateString()
        return date
    }
    return (
        <MaxWidthWrapper>
            <div className='flex flex-col gap-12'>
                <section
                    className='flex flex-col min-h-[calc(100vh-9rem-1px)] md:flex-row items-center justify-between gap-2'>

                    <div id='post-container' className='flex flex-col w-1/2 p-4 gap-2'>
                        <div id='user-container' className='flex w-full gap-2'>
                            <div className='size-12 shrink-0 '>
                                <img src={'/user-1.jpg'} alt="" className='w-full aspect-square object-cover rounded-full' />
                            </div>
                            <div className='flex justify-between w-full'>
                                <div>
                                    <div className='flex gap-1 items-center'>
                                        <p className='font-semibold text-zinc-950 text-nowrap'>Agust Teen</p>
                                        {

                                            <CheckCircle2 className='fill-sky-500 stroke-white ring-0 stroke-2 size-4' />
                                        }
                                    </div>
                                    <div className='flex'>
                                        <Star size={16} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={16} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={16} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={16} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={16} className="stroke-1 stroke-transparent fill-[#FDD663]" />

                                    </div>
                                </div>
                                <p className='text-sm text-zinc-900 font-light text-nowrap self-end'>Posted: {hourConvert(post?.createdAt as unknown as string)}</p>
                            </div>
                        </div>

                        <div className='size-full shadow-xl'>
                            <img src={post?.url_image} alt={post?.title} className='w-full aspect-square object-cover rounded-xl' />
                        </div>
                    </div>
                    <div id='description-container' className='w-1/2 flex h-[450px] flex-col gap-2 items-center justify-between'>
                        <div className='w-full px-6 flex flex-col gap-4'>
                            <h1 className='text-4xl font-bold'>{'Veterinary'}</h1>
                            <h1 className='text-2xl font-bold'>{post?.title}</h1>
                            <div>
                                <p className=''>{post?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis est atque ratione velit ducimus vel magnam explicabo modi ipsa temporibus aliquam, quas sit tempore debitis cupiditate, eius suscipit qui deserunt.</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-lg font-semibold'>Services type:</h2>
                                <div className='flex gap-2'>
                                    <div
                                        className='flex cursor-pointer gap-1 rounded-md items-center border w-min text-nowrap p-2 border-zinc-400 hover:border-zinc-600 '>
                                        {post?.hourly_price} {post?.currency} Standar
                                    </div>
                                    <div className='flex cursor-pointer gap-1 rounded-md items-center border w-min text-nowrap p-2 border-zinc-400 hover:border-zinc-600 '>{(Number(post?.hourly_price) * 1.77).toFixed(1)} {post?.currency} Premium</div>
                                </div>
                            </div>
                        </div>
                        {/* <Input
                            type="text"
                            placeholder="Enter recipient ID"
                            value={recipientId}
                            onChange={(e) => setRecipientId(e.target.value)}
                        /> */}
                        <Button onClick={() => setIsOpen(true)} className="w-1/3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150" >Chat <MessageSquareText /></Button>
                        <ChatDialogModal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            recipientId={Number(recipientId)}
                        />
                    </div>
                </section>
                <section id='user-info' className='flex flex-col gap-4'>
                    <h1 className='text-2xl font-medium '>About servicer</h1>
                    <div className='flex gap-4'>
                        <div className='size-32'>
                            <img src="/user-1.jpg" className='w-full ring-1 ring-green-600 aspect-square object-cover rounded-full' alt="" />
                        </div>
                        <div>

                            <div className='flex gap-2 items-start '>
                                <div className='flex gap-2 items-center'>
                                    <h2 className='text-xl'>Agust Teen</h2>
                                    <VerifiedIcon className='fill-sky-500 stroke-white ring-0 stroke-2 size-6' />

                                </div>
                            </div>

                            <p className='text-sm font-light'>Member since: {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</p>
                            <div className='flex items-center font-base'>
                                <Star size={24} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                <Star size={24} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                <Star size={24} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                <Star size={24} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                <Star size={24} className="stroke-1 stroke-transparent fill-[#FDD663]" />

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
                                `(${post?.num_reviews})`
                            }
                        </p>
                    </div>
                    <div className='bg-zinc-100 p-2 flex flex-col gap-4'>
                        <div className='flex gap-2 py-4'>
                            <div className='size-12 shrink-0'>
                                <img src="/user-2.jpg" alt="" className='w-full aspect-square object-cover rounded-full' />
                            </div>
                            <div>
                                <div className='flex gap-2 items-center'>
                                    <h3 className=' font-medium'>Sidney Sweeney</h3>
                                    <h3 className=' font-light'>@sunflores23</h3>
                                </div>
                                <p className='text-medium font-normal'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est cum ea eos, magni illo hic voluptatum nulla sit ratione, commodi debitis id. Laudantium, sint minima accusantium asperiores quo qui architecto.
                                </p>
                                <div>
                                    <div className='flex items-center font-base'>
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className='flex gap-2 py-4'>
                            <div className='size-12 shrink-0'>
                                <img src="/user-3.webp" alt="" className='w-full aspect-square object-cover rounded-full' />
                            </div>
                            <div>
                                <div className='flex gap-2 items-center'>
                                    <h3 className=' font-medium'>Frank Ocean</h3>
                                    <h3 className=' font-light'>@freankie12</h3>
                                </div>
                                <p className='text-medium font-normal'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est cum ea eos, magni illo hic voluptatum nulla sit ratione, commodi debitis id. Laudantium, sint minima accusantium asperiores quo qui architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae sapiente, in quod totam iure natus nesciunt similique exercitationem consectetur neque maxime molestias soluta velit. Placeat aperiam ipsa quia nemo quo.
                                </p>
                                <div>
                                    <div className='flex items-center font-base'>
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                        <Star size={18} className="stroke-1 stroke-transparent fill-[#FDD663]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </MaxWidthWrapper>
    )
}

export default Page