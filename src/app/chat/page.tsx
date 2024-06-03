'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { ChatDialogModal } from '@/components/ChatDialog';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MaxWidthWrapper>
            <Button onClick={() => setIsOpen(true)}>Open Chat</Button>
            <ChatDialogModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </MaxWidthWrapper>
    );
}

export default Chat;
