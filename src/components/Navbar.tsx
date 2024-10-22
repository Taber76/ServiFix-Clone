'use client'

import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, NavbarMenuToggle, Navbar as Nav, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { DialogModal } from "./Dialog";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/store/authStore'
import { type User } from '@/types/front.types'
interface UserAvatarProps {
    user: User | null;
}

export function UserAvatar({ user }: UserAvatarProps) {
    const router = useRouter()
    const { clearAuthState } = useAuthStore()

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        src={user?.photo}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{user?.name}</p>
                    </DropdownItem>
                    <DropdownItem key="my-chats" onClick={() => router.push("/my-chats")}>
                        Chats
                    </DropdownItem>
                    <DropdownItem key="my-posts" onClick={() => router.push("/my-posts")}>
                        My Posts
                    </DropdownItem>
                    <DropdownItem key="my-reviews" onClick={() => router.push("/my-reviews")}>
                        My Reviews
                    </DropdownItem>
                    <DropdownItem
                        key="logout"
                        color="danger"
                        onClick={() => {
                            clearAuthState()
                            router.push('/')
                        }}
                    >
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

const Navbar = () => {
    //const isLoggedIn = false
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname()
    const { isLoggedIn, user, clearAuthState } = useAuthStore()

    const [isModalOpen, setIsModalOpen] = useState(false);


    const menuItemsLogged = [
        "Profile",
        "My-Posts",
        "My-Reviews",
        "Chats",
        "Services",
        //"Become a Tasker",
        //"Help & Feedback",
        //"Settings",
        "Log Out",
    ];
    const menuItemsDefault = [
        "Login",
        "Signup",
        "Become a Tasker",
        "Services",
        "Help & Feedback",
    ];

    const handleLinkClick = () => {
        setIsOpen(false);
    }

    return (
        <>
            {/* desktop navbar     */}
            <nav className='sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
                <MaxWidthWrapper>
                    <div className='flex h-full items-center justify-between border-b border-zinc-200 text-black'>
                        <Link href='/' className='flex z-40 font-semibold text-xl'>
                            SERVI <span className="text-green-800">FIX</span>
                        </Link>

                        {/* desktop navigation */}
                        <div className='h-full hidden md:flex items-center space-x-4'>
                            {
                                pathname === '/' ? (
                                    <>
                                        <Link
                                            href='#about'
                                            className="hover:bg-zinc-200 transition-all p-2 rounded-md"
                                        >
                                            About
                                        </Link>
                                        <Link
                                            href='#join-us'
                                            className="hover:bg-zinc-200 transition-all p-2 rounded-md"
                                        >
                                            Join us
                                        </Link>
                                    </>
                                ) : null
                            }

                            <Link
                                href='/services'
                                className="hover:bg-zinc-200 transition-all p-2 rounded-md">
                                Services
                            </Link>

                            {
                                isLoggedIn ? (
                                    null
                                ) : (
                                    <Link
                                        href='/login'
                                        className="hover:bg-zinc-200 transition-all p-2 rounded-md">
                                        Login
                                    </Link>
                                )
                            }

                            <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                            {
                                isLoggedIn ? (
                                    <UserAvatar user={user} />
                                ) : (
                                    <Link
                                        href='/signup'
                                        className='hidden sm:flex items-center gap-1 bg-green-600 p-2 rounded-md text-white hover:bg-green-700 transition-all px-4 '>
                                        Sign up
                                    </Link>
                                )
                            }
                        </div>

                        {/* mobile burger */}
                        <div className='h-full flex md:hidden items-center space-x-4'>
                            <Nav isMenuOpen={isOpen} onMenuOpenChange={setIsOpen}>
                                <NavbarMenuToggle
                                    onChange={() => setIsOpen(!isOpen)}
                                    className="md:hidden" />
                                <NavbarMenu>
                                    {isLoggedIn && menuItemsLogged.map((item, index) => (
                                        <NavbarMenuItem key={`${item}-${index}`}>
                                            <Link
                                                onClick={handleLinkClick}
                                                className={`${index === menuItemsLogged.length - 1
                                                    ? "text-red-600"
                                                    : "text-black"
                                                    } w-full  hover:bg-slate-100 p-2 rounded-lg transition-all 
                                                    ${pathname === `/${item.toLowerCase().replaceAll(" ", "-")}`
                                                        ? "bg-zinc-200"
                                                        : ""
                                                    }`}
                                                href={`/${item.toLowerCase().replaceAll(" ", "-")}`}

                                            >
                                                {item}
                                            </Link>
                                        </NavbarMenuItem>
                                    ))}
                                    {!isLoggedIn && menuItemsDefault.map((item, index) => (
                                        <NavbarMenuItem key={`${item}-${index}`}>
                                            <Link
                                                onClick={handleLinkClick}
                                                className={`w-full hover:bg-slate-100 p-2 rounded-lg transition-all 
                                                ${pathname === `/${item.toLowerCase().replaceAll(" ", "-")}`
                                                        ? "bg-zinc-200"
                                                        : ""
                                                    }`}
                                                href={`/${item.toLowerCase().replaceAll(" ", "-")}`}
                                            >
                                                {item}
                                            </Link>
                                        </NavbarMenuItem>
                                    ))}
                                </NavbarMenu>
                            </Nav>
                        </div>
                    </div>
                </MaxWidthWrapper >
            </nav >


            <DialogModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
    )
}

export default Navbar
