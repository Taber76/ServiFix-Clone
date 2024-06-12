'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useAuthStore } from '@/store/serviceStore'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Divider, Input } from '@nextui-org/react'
import { type Chat } from '@/types/front.types'
import { useRouter } from 'next/navigation'
import { ChatDialogModal } from '@/components/ChatDialog';


const MyChats = () => {
  const router = useRouter()
  const [chats, setChats] = useState<Chat[]>([])
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const { user } = useAuthStore(state => ({ user: state.user }));


  useEffect(() => {
    const getChats = async () => {
      if (user) {
        setUserId(user.id)
        const getChats = await axios.get(`/api/chat/getall`)
        if (getChats.data) {
          setChats(getChats.data)
        }
        console.log(getChats.data)
      }
    }

    getChats()

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
            Chats {' '}
            {`(${chats?.length})`}
          </p>
        </div>
        <div className='bg-zinc-100 p-2 flex flex-col gap-4'>
          {
            chats?.map((chat, index) => {
              return (
                <div key={chat.id}
                  onClick={() => setIsOpen(true)}
                >

                  <ChatDialogModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    recipientId={chat.user_id}
                    serviceId={chat.service_id}
                  />


                  <div className='flex gap-2 py-4'>
                    <div className='size-12 shrink-0'>
                      {chat.service_image ? (
                        <img src={chat.service_image} alt="Service image" className='w-full aspect-square object-cover rounded-full' />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <div className='flex gap-2 items-center'>
                        <h3 className=' font-medium'>{chat.service_title}</h3>
                        <h3 className=' font-light'>@ Last message: {hourConvert(chat.updatedAt as unknown as string)}</h3>
                      </div>
                      <p className='text-medium font-bold'>
                        {chat.username}
                      </p>
                      <p className='text-medium font-normal'>
                        {chat.last_message}
                      </p>

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

export default MyChats