'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RatingStars from '@/components/RatingStars'
import { useAuthStore } from '@/store/serviceStore'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Divider, Input } from '@nextui-org/react'
import { type Review } from '@/types/front.types'
import { useRouter } from 'next/navigation'


const MyReviews = () => {
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [userId, setUserId] = useState<number | null>(null);
  const { user } = useAuthStore(state => ({ user: state.user }));


  useEffect(() => {
    const getReviews = async () => {
      if (user) {
        setUserId(user.id)
        const getReviews = await axios.get(`/api/review/getbyuserid?user_id=${user.id}`)
        if (getReviews.data) {
          setReviews(getReviews.data)
        }
        console.log(getReviews.data)
      }
    }

    getReviews()

  }, [user])

  function hourConvert(time: string) {
    const date = new Date(time).toDateString()
    return date
  }

  return (
    <main className='min-h-[calc(100vh-9rem-1px)] flex flex-col justify-center h-full py-12'>
      <MaxWidthWrapper><section id='reviews' className='flex flex-col gap-4 pb-12'>
        <div>
          <p>
            Reviews and Comentaries {' '}
            {`(${reviews?.length})`}
          </p>
        </div>
        <div className='bg-zinc-100 p-2 flex flex-col gap-4'>
          {
            reviews?.map((review, index) => {
              return (
                <div key={review.id}
                  onClick={() => router.push(`/edit-review/${review.id}/0`)}
                >
                  <div className='flex gap-2 py-4'>
                    <div className='size-12 shrink-0'>
                      {review.url_image ? (
                        <img src={review.url_image} alt="Service image" className='w-full aspect-square object-cover rounded-full' />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <div className='flex gap-2 items-center'>
                        <h3 className=' font-medium'>{review.service_title}</h3>
                        <h3 className=' font-light'>@ {hourConvert(review.updatedAt as unknown as string)}</h3>
                      </div>
                      <p className='text-medium font-bold'>
                        {review.title}
                      </p>
                      <p className='text-medium font-normal'>
                        {review.comment}
                      </p>
                      <div>
                        <RatingStars rating={review.rating} />
                      </div>
                    </div>
                  </div>
                  <Divider />
                </div>
              )
            })
          }

        </div>
      </section>
      </MaxWidthWrapper>
    </main>
  )
}

export default MyReviews