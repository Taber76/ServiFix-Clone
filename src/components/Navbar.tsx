import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"


const Navbar = () => {
    return (
        <nav className='sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-full items-center justify-between border-b border-zinc-200 text-black'>
                    <Link href='/' className='flex z-40 font-semibold text-xl'>
                        SERVI <span className="text-green-800">FIX</span>
                    </Link>

                    <div className='h-full flex items-center space-x-4'>
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

                        <Link
                            href='/login'
                            className="hover:bg-zinc-200 transition-all p-2 rounded-md">
                            Login
                        </Link>

                        <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                        <Link
                            href='/signup'
                            className='hidden sm:flex items-center gap-1 bg-green-600 p-2 rounded-md text-white hover:bg-green-700 transition-all px-4 '>
                            Sign up
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper >
        </nav >
    )
}

export default Navbar