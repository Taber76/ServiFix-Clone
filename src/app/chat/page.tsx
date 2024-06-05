'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { ChatDialogModal } from '@/components/ChatDialog';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [recipientId, setRecipientId] = useState('');


    return (
        <MaxWidthWrapper>
            <Input
                type="text"
                placeholder="Enter recipient ID"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
            />
            <Button onClick={() => setIsOpen(true)}>Open Chat</Button>
            <ChatDialogModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                recipientId={Number(recipientId)}
            />
        </MaxWidthWrapper>
    );
}

export default Chat;
