'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { Button } from "@nextui-org/react";
import { type DetailedPost } from '@/types/front.types'

const currencyOptions = ['USD', 'ARG']
import citiesOptions from '@/../public/data/cities.json'
import categoriesOptions from '@/../public/data/servicetypes.json'

const EditPost = () => {
    const router = useRouter()
    const postId = useParams()?.edit
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState<DetailedPost | null>(null)
    const [titleInput, setTitleInput] = useState<HTMLInputElement | null>(null)
    const [descriptionInput, setDescriptionInput] = useState<HTMLInputElement | null>(null)
    const [categoryInput, setCategoryInput] = useState<HTMLInputElement | null>(null)
    const [cityInput, setCityInput] = useState<HTMLInputElement | null>(null)
    const [priceInput, setPriceInput] = useState<HTMLInputElement | null>(null)
    const [currencyInput, setCurrencyInput] = useState<HTMLInputElement | null>(null)


    useEffect(() => {
        const getPost = async () => {
            if (postId) {
                const { data } = await axios.get(`/api/service/getbyserviceid?id=${postId}`)
                if (!data) router.push('/not-found')
                setPost(data)
                console.log(data)
            }
        }

        getPost()
    }, [postId, router])

    useEffect(() => {
        setTitleInput(document.querySelector('#title-input') as HTMLInputElement)
        setDescriptionInput(document.querySelector('#description-input') as HTMLInputElement)
        setCategoryInput(document.querySelector('#category-input') as HTMLInputElement)
        setCityInput(document.querySelector('#city-input') as HTMLInputElement)
        setPriceInput(document.querySelector('#price-input') as HTMLInputElement)
        setCurrencyInput(document.querySelector('#currency-input') as HTMLInputElement)
    }, [])

    useEffect(() => {
        if (post) {
            if (titleInput) titleInput.value = post.title
            if (descriptionInput) descriptionInput.value = post.description
            if (categoryInput) categoryInput.value = post.category
            if (cityInput) cityInput.value = post.city
            if (priceInput) priceInput.value = post.price.toString()
            if (currencyInput) currencyInput.value = post.currency
        }
    }, [post, titleInput, descriptionInput, categoryInput, cityInput, priceInput, currencyInput])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!titleInput || !descriptionInput || !categoryInput || !cityInput || !priceInput || !currencyInput) return
        try {
            setIsLoading(true)
            const service_type_id = categoriesOptions.find(category => category.name === categoryInput.value)?.id
            const city_id = citiesOptions.find(city => city.name === cityInput.value)?.id

            const editedPost = {
                id: post?.id,
                title: titleInput.value,
                description: descriptionInput.value,
                hourly_price: Number(priceInput.value),
                currency: currencyInput.value,
                service_type_id,
                city_id,
                shown: true,
                active: true
            }

            let response: any

            // New post
            if (!post) response = await axios.post('/api/service/register', editedPost)

            // Edit post
            else response = await axios.put(`/api/service/update?id=${post.id}`, editedPost)

            if (response.status !== 200) throw new Error('Failed to update service.')
            toast({
                title: `Post updated.`,
                variant: 'default',
                description: `Post updated successfully.`,
            })

            router.push('/my-posts')

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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post</h2>
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
                                id="description-input"
                                className='bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 min-h-[150px]'
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                                maxLength={250}
                                placeholder="Description" />

                            {/* Category */}
                            <select
                                id="category-input"
                                className='bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 w-full'
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                            >
                                {categoriesOptions.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {/* City */}
                            <select
                                id="city-input"
                                className='bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 w-full'
                                autoCorrect='off'
                                autoComplete='off'
                                spellCheck='false'
                            >
                                {citiesOptions.map((city) => (
                                    <option key={city.id} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>

                            <div className='flex flex-col md:flex-row md:gap-2 w-full'>

                                {/* Price */}
                                <input
                                    id="price-input"
                                    type="number"
                                    className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 w-full"
                                    autoCorrect='off'
                                    autoComplete='off'
                                    spellCheck='false'
                                    maxLength={50}
                                    placeholder="Price" />

                                {/* Currency */}
                                <select
                                    id="currency-input"
                                    className='bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition ease-in-out duration-150 w-full'
                                    autoCorrect='off'
                                    autoComplete='off'
                                    spellCheck='false'

                                >
                                    {currencyOptions.map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>

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
                    {post?.url_image ?
                        <img src={post.url_image} alt="post-image"
                            className="w-2/3 max-w-[400px] lg:block rounded-lg" />
                        :
                        <Image src='/signup.svg' width={100} loading='eager' priority height={100} alt="how-it-works" className="w-full max-w-[800px] lg:block hidden" />
                    }
                </div>
            </main>
        </MaxWidthWrapper>
    )
}

export default EditPost
