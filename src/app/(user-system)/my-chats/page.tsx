'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useAuthStore } from '@/store/serviceStore'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Divider } from '@nextui-org/react'
import { type Chat } from '@/types/front.types'
import { useRouter } from 'next/navigation'
import { ChatDialogModal } from '@/components/ChatDialog';


const MyChats = () => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [isOpen, setIsOpen] = useState(false);
  const [recipientId, setRecipientId] = useState<number>(0);
  const [serviceId, setServiceId] = useState<number>(0);
  const { user } = useAuthStore(state => ({ user: state.user }));


  useEffect(() => {
    const getChats = async () => {
      if (user) {
        const getChats = await axios.get(`/api/chat/getall`)
        if (getChats.data) {
          setChats(getChats.data)
        }
      }
    }

    setIsMounted(true)
    getChats()

  }, [user, router])


  const handleChatClick = (chatId: number) => {
    setIsOpen(true)
    const recipient = chats?.find((chat) => chat.chat_id === chatId)?.user_id ?? 0
    const service = chats?.find((chat) => chat.chat_id === chatId)?.service_id ?? 0
    setRecipientId(recipient)
    setServiceId(service)
  }

  return (
    <main className='min-h-[calc(100vh-9rem-1px)] flex flex-col justify-center h-full py-12'>
      {isMounted &&

        <MaxWidthWrapper>
          <section id='reviews' className='flex flex-col gap-4 pb-12'>
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
                    <div key={chat.chat_id}>

                      <div className='flex justify-between'>

                        <div className='flex gap-2 py-4' onClick={() => handleChatClick(chat.chat_id)}>
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
                              <h3 className=' font-light'>@ Last message: {chat.last_message}</h3>
                            </div>
                            <p className='text-medium font-bold'>
                              {chat.username}
                            </p>

                          </div>
                        </div>

                        <Button
                          onClick={() => router.push(`/edit-review/0/${chat.service_id}`)}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-green-700 transition ease-in-out duration-150">
                          Review
                        </Button>

                      </div>


                      <Divider />
                    </div>
                  )
                })
              }

            </div>
            <ChatDialogModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              recipientId={recipientId}
              serviceId={serviceId}
            />
          </section>
        </MaxWidthWrapper>

      }
    </main>
  )
}

export default MyChats