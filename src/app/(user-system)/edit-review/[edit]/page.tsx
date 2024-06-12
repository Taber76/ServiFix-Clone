'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { Button } from "@nextui-org/react";
import { type Review } from '@/types/front.types'


const EditReview = () => {
    const router = useRouter()
    const reviewId = useParams()?.edit
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [review, setReview] = useState<Review | null>(null)
    const [titleInput, setTitleInput] = useState<HTMLInputElement | null>(null)
    const [commentInput, setCommentInput] = useState<HTMLInputElement | null>(null)
    const [ratingInput, setRatingInput] = useState<HTMLInputElement | null>(null)


    useEffect(() => {
        const getPost = async () => {
            if (reviewId) {
                const { data } = await axios.get(`/api/review/getbyid?id=${reviewId}`)
                if (!data) router.push('/not-found')
                setReview(data)
                console.log(data)
            }
        }

        getPost()
    }, [reviewId, router])

    useEffect(() => {
        setTitleInput(document.querySelector('#title-input') as HTMLInputElement)
        setCommentInput(document.querySelector('#comment-input') as HTMLInputElement)
        setRatingInput(document.querySelector('#rating-input') as HTMLInputElement)
    }, [])

    useEffect(() => {
        if (review) {
            if (titleInput && review.title) titleInput.value = review.title
            if (commentInput) commentInput.value = review.comment
            if (ratingInput) ratingInput.value = review.rating.toString()
        }
    }, [review, titleInput, commentInput, ratingInput])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!titleInput || !commentInput || !ratingInput) return
        try {
            setIsLoading(true)

            const editedReview = {
                id: review?.id,
                title: titleInput.value,
                comment: commentInput.value,
                rating: Number(ratingInput.value),
                active: true
            }

            let response: any

            // New post
            if (!review) response = await axios.post('/api/review/register', editedReview)

            // Edit post
            else response = await axios.put(`/api/review/update`, editedReview)

            if (response.status !== 200) throw new Error('Failed to update service.')
            toast({
                title: `Review updated.`,
                variant: 'default',
                description: `Review updated successfully.`,
            })

            router.push('/my-reviews')

        } catch (error: any) {
            if (error.response?.data.msg) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `${error.response.data.msg}`,
                })
                return
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
            <main className='flex w-full sm:flex-row-reverse flex-col-reverse items-center justify-center lg:justify-between lg:gap-12'>
                <div className="flex w-full md:w-1/2 lg:w-2/3 flex-col items-center justify-center h-full">
                    <div className="w-full md:min-w-96 max-w-2xl bg-white rounded-lg md:shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Review</h2>
                        <form className="flex flex-col" onSubmit={handleSubmit}>

                            {/* Title */}
                            <input
                                id="title-input"
                                type="text"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={50}
                                placeholder="Title" />

                            {/* Description */}
                            <textarea
                                id="comment-input"
                                className='bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 min-h-[150px]'
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={250}
                                placeholder="Comment" />

                            {/* Rating */}
                            <input
                                id="rating-input"
                                type="number"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 w-full"
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={10}
                                placeholder="Rating" />


                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150">
                                {isLoading ? 'Loading...' : 'Save'}
                            </Button>
                            <Button
                                isLoading={isLoading}
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-red-600 hover:to-red-700 transition ease-in-out duration-150"
                                onClick={() => router.push('/my-posts')}
                            >
                                {isLoading ? 'Loading...' : 'Cancel'}
                            </Button>
                        </form>
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    {review?.url_image ?
                        <img src={review.url_image} alt="review-image"
                            className="w-2/3 max-w-[400px] lg:block rounded-lg" />
                        :
                        <Image src='/signup.svg' width={100} loading='eager' priority height={100} alt="how-it-works" className="w-full max-w-[800px] lg:block hidden" />
                    }
                </div>
            </main>
        </MaxWidthWrapper>
    )
}

export default EditReview
