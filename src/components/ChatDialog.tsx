import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import io, { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import Cookies from 'js-cookie';

export function ChatDialogModal({ isOpen, setIsOpen, recipientId }:
    { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, recipientId: number }) {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<any[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`/api/chat/getbyusers?user2_id=${recipientId}`);
                setMessages(response.data.messages);
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };
        if (isOpen) fetchChatHistory()

        const socketInit = async () => {
            await axios.get('/api/socket');
            socketRef.current = io();
            socketRef.current.emit('authenticate', Cookies.get('accessToken'));
            socketRef.current.on('message', (msg, recipient_id) => {
                if (recipient_id === recipientId)
                    setMessages((prev) => [...prev, { message: msg, sender_id: recipientId }]);
            });
        };

        socketInit();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [isOpen, recipientId]);

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
            <DialogContent className="sm:max-w-[425px] bg-blue-800/50 border border-green-600">

                <DialogHeader>
                    <DialogTitle>Chat</DialogTitle>
                    <DialogDescription>
                        Chat con el usuario.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-1 py-1">
                    <div className="max-h-80 overflow-y-auto p-2 border border-green-600 rounded bg-white">
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 mb-1 rounded ${msg.sender_id !== recipientId ? 'bg-green-200 text-right ml-5' : 'bg-gray-200 self-end text-left mr-5'}`}>
                                {msg.message}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="p-2 border border-gray-300 rounded resize-none min-h-[50px] max-h-[150px] w-full overflow-y-auto"
                        placeholder="Type your message..."
                    />
                </div>

                <DialogFooter className="flex flex-row justify-evenly items-center gap-1">
                    <Button
                        variant="default"
                        color="access"
                        onClick={handleSendMessage}>
                        Send
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
