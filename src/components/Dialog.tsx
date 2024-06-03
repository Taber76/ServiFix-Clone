import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

export function DialogModal({
    isOpen, setIsOpen }
    :
    { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Oops!</DialogTitle>
                    <DialogDescription>
                        You need to be logged in or signed up.{" "}
                        Please login or sign up to continue!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Image
                        src={'/cat.svg'}
                        alt="cat"
                        width={1024}
                        height={10}
                        className="rounded-xl aspect-[3/2] " />
                </div>
                <DialogFooter className="flex flex-row justify-evenly items-center gap-4">
                    <Link
                        onClick={() => setIsOpen(false)}
                        href='/login'
                        className='flex items-center gap-1 outline outline-1 p-2  rounded-md text-black hover:bg-zinc-200 transition-all px-8 text-center'>
                        Log in
                    </Link>
                    <Link
                        onClick={() => setIsOpen(false)}
                        href='/signup'
                        className='flex items-center gap-1 bg-green-600 p-2 rounded-md text-white hover:bg-green-700 transition-all px-8 text-center '>
                        Sign up
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
