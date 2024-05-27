'use client'

import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, NavbarMenuToggle, Navbar as Nav, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function UserAvatar() {
    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">zoey@example.com</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        My Settings
                    </DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                    <DropdownItem key="analytics">
                        Analytics
                    </DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">
                        Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

const Navbar = () => {
    const isLoggedIn = false
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname()

    const menuItemsLogged = [
        "Profile",
        "About",
        "Services",
        "Help & Feedback",
        "Settings",
        "Log Out",
    ];
    const menuItemsDefault = [
        "Login",
        "Signup",
        "About",
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
                            <Link
                                href='#'
                                className="hover:bg-zinc-200 transition-all p-2 rounded-md"
                            >
                                About
                            </Link>
                            <Link
                                href='#'
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
                                    <UserAvatar />
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
                                                    ${pathname === `/${item.toLowerCase().replaceAll(" ", "")}`
                                                        ? "bg-zinc-200"
                                                        : ""
                                                    }`}
                                                href={`/${item.toLowerCase().replaceAll(" ", "")}`}

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
                                                ${pathname === `/${item.toLowerCase().replaceAll(" ", "")}`
                                                        ? "bg-zinc-200"
                                                        : ""
                                                    }`}
                                                href={`/${item.toLowerCase().replaceAll(" ", "")}`}
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


        </>
    )
}

export default Navbar
