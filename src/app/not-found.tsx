import Link from 'next/link'
import Image from "next/image"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

function NotFound() {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col text-center justify-center items-center gap-1">
        <h1 className="text-3xl lg:text-5xl">Oops!! Page not found!!</h1>
        <div className="grid gap-4 my-2">
          <Image
            src={'/dog.svg'}
            alt="cat"
            width={480}
            height={10}
            className="rounded-xl aspect-[3/2] " />
        </div>
        <div>
          <Link
            href="/"
            className='flex items-center  bg-green-600 p-2 rounded-md text-white hover:bg-green-700 transition-all text-center'>
            Go back to Home
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>)
}

export default NotFound