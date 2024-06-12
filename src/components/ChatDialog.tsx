import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import io, { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import Cookies from 'js-cookie';
import { useAuthStore } from '@/store/serviceStore'

export function ChatDialogModal({ isOpen, setIsOpen, recipientId }:
    { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, recipientId: number }) {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<any[]>([]);
    const [chatInfo, setChatInfo] = useState<any>({});
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const { user } = useAuthStore(state => ({ user: state.user }));

    useEffect(() => {
        if (user) {
            setUserId(user.id)
        }
    }, [user])


    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`/api/chat/getbyusers?user2_id=${recipientId}`);
                if (response.status !== 200) return;
                const { chat, messages } = response.data;
                console.log(chat, messages)
                setMessages(messages);
                setChatInfo(chat);

            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };

        const socketInit = async () => {
            await axios.get('/api/socket');
            socketRef.current = io();
            socketRef.current.emit('authenticate', Cookies.get('accessToken'));
            socketRef.current.on('message', (msg, senderId) => {
                if (senderId === recipientId)
                    setMessages((prev) => [...prev, { message: msg, sender_id: recipientId }]);
            });
        };

        if (isOpen && userId) {
            fetchChatHistory()
            socketInit();
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [isOpen, recipientId, userId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (socketRef.current && message.trim()) {
            socketRef.current.emit('message', message, recipientId);
            setMessages((prev) => [...prev, { message, sender_id: 0 }]);
            setMessage('');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="md:max-w-[600px] max-w-[400px]bg-blue-800/50 max-h-[90%] border border-green-600 p-2">

                <div className="flex-1 flex flex-col h-full">

                    {/*Avatar and username*/}
                    <div className="flex sm:items-center justify-between py-1 border-b-2 border-gray-200">
                        <div className="relative flex items-center space-x-4">
                            <div className="relative">
                                {isConnected &&
                                    <span className="absolute text-green-500 right-0 bottom-0">
                                        <svg width="20" height="20">
                                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                        </svg>
                                    </span>
                                }
                                <img src={recipientId === chatInfo.user1_id ? chatInfo.user1_photo : chatInfo.user2_photo} alt="" className="w-5 sm:w-12 h-5 sm:h-12 rounded-full" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <div className="text-2xl mt-1 flex items-center">
                                    <span className="text-gray-700 mr-3">{recipientId === chatInfo.user1_id ? chatInfo.user1_username : chatInfo.user2_username}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Messages*/}
                    <div id="messages" className="h-[60vh] flex flex-col space-y-4 p-3 overflow-y-auto"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#edf2f7 #f7fafc' }}
                        ref={messagesEndRef}
                    >

                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender_id == recipientId ? 'justify-start' : 'justify-end'}`}>
                                <div className="flex items-end">
                                    <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${msg.sender_id == recipientId ? 'items-start order-2' : 'items-end order-1'}`}>
                                        <div><span className={`px-4 py-2 rounded-lg inline-block rounded-bl-none ${msg.sender_id == recipientId ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 text-blue-100'}`}>{msg.message}</span></div>
                                    </div>
                                    {msg.sender_id == recipientId && <img src={recipientId === chatInfo.user1_id ? chatInfo.user1_username : chatInfo.user2_username} alt="My profile" className="w-6 h-6 rounded-full order-1" />}
                                </div>
                            </div>
                        ))}


                    </div>

                    {/* Typing area */}
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0" >
                        <div className="relative flex">
                            <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                                value={message} onChange={(e) => { setMessage(e.target.value) }} />
                            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                                    onClick={() => { handleSendMessage() }}
                                >
                                    <span className="font-bold">Send</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </DialogContent>
        </Dialog>
    );
}
