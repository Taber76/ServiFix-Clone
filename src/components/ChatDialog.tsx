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

export function ChatDialogModal({ isOpen, setIsOpen }:
    { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([''])
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // connect to socket
        const socketInit = async () => {
            await axios.get('/api/socket')
            socketRef.current = io();

            // on connect authenticate
            socketRef.current.emit('authenticate', Cookies.get('accessToken'));

            // on message
            socketRef.current.on('message', (msg, senderId) => {
                setMessages((prev) => [...prev, `Pirulo: ${msg}`]);
            })
        }

        // falta cargar mensajes del chat
        socketInit()

    }, [])

    const handleSendMessage = () => {
        if (socketRef.current && message.trim()) {
            const [recipientId, userMessage] = message.trim().split('**');
            socketRef.current.emit('message', userMessage, parseInt(recipientId));
            setMessages((prev) => [...prev, `Yo: ${userMessage}`]);
            setMessage('');
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chat</DialogTitle>
                    <DialogDescription>
                        Chat con pirulo.{" "}
                        ultimo mensaje...
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="max-h-40 overflow-y-auto p-2 border border-gray-300 rounded">
                        {messages.map((msg, index) => (
                            <div key={index} className="p-2">
                                {msg}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        placeholder="Type your message..."
                    />
                    <Button
                        variant="default"
                        color="access"
                        onClick={handleSendMessage}>
                        Send
                    </Button>
                </div>
                <DialogFooter className="flex flex-row justify-evenly items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}>
                        CLOSE
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
