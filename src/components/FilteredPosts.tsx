/* eslint-disable @next/next/no-img-element */
import { CheckCircle2, Star } from 'lucide-react'
import LocationIcon from '@/components/icons/LocationIcon'
import BillIcon from '@/components/icons/BillIcon'
import useFilterPosts from '@/hooks/useFilterPosts'
//import { posts } from '@/lib/data'
import { AllPosts, getAllPosts } from '@/services/getAllPosts'
import { useEffect, useState } from 'react'

const FilteredPosts = () => {
    const [filteredPosts, setFilteredPosts] = useState<AllPosts[]>([])
    const { filterPosts } = useFilterPosts();
    //const filteredPosts = filterPosts(posts);

    useEffect(() => {
        const fetchFilteredPosts = async () => {
            try {
                const data = await getAllPosts();
                if (data) {
                    const filteredData = filterPosts(data);
                    setFilteredPosts(filteredData);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchFilteredPosts();

    }, []);


    return (
        <>
            {
                filteredPosts.length > 0
                    ? filteredPosts.map((post) => (
                        <div key={crypto.randomUUID()}
                            className='flex items-center max-h-38 gap-2 md:gap-4 p-2 md:p-4 bg-zinc-50 hover:shadow-md cursor-pointer rounded-lg hover:scale-[1.01] transition-all odd:bg-zinc-100 justify-between w-full shadow-md'>
                            <div className='flex w-full items-center gap-4 '>
                                <div className='w-2/5 sm:w-1/5 md:w-1/3 flex justify-center items-center relative'>
                                    <img
                                        src={post.url_image}
                                        alt={post.title}
                                        className='ring-1 w-full ring-zinc-200 rounded-sm object-cover aspect-square' />

                                    {
                                        post.rating > 4 && (
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
                                        by: {post.username} {
                                            post.isVerified
                                            &&
                                            <CheckCircle2 className='fill-sky-500 stroke-white stroke-2 size-4' />
                                        }
                                    </span>

                                    <p
                                        className='flex gap-1 items-center text-xs md:text-base' >
                                        <LocationIcon className={'stroke-1 stroke-green-800 md:size-5 sm:size-4 size-3'} /> {post.city_name}
                                    </p>
                                    <p className='flex gap-1 items-center text-xs md:text-base'><BillIcon className={'stroke-1 stroke-green-800 md:size-5 sm:size-4 size-3  '} /> from {post.hourly_price} {post.currency}</p>
                                    <div className='flex items-center'>
                                        {
                                            post.rating > 0 ? post.rating <= 5 && (
                                                Array(5).fill(0).map((_, index) => (
                                                    <Star
                                                        key={index}
                                                        size={16}
                                                        fill={index < post.rating ? 'gold' : 'gray'}
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
                                            post.num_reviews > 0 && <p className='text-sm font-light ml-2'>({post.num_reviews})</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='hidden md:flex flex-col-reverse h-full gap-2 md:items-end justify-between w-fit'>
                                <button className='bg-green-500 text-white px-4 py-2 rounded-lg w-full text-nowrap'>Hire now</button>
                                <div>
                                    <p className='text-xs font-light text-end'>{`posted at ${post.createdAt}`}</p>
                                </div>
                            </div>
                        </div>)
                    )
                    : <p className='text-lg font-semibold text-center flex gap-2 h-full place-self-center mt-12'>No posts found <LocationIcon className='size-7 stroke-green-600' /></p>
            }
        </>
    )
}

export default FilteredPosts