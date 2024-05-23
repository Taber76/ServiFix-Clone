
import { ReactNode } from 'react'

const MaxWidthWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className={'h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20'}>
            {children}
        </div >
    )
}

export default MaxWidthWrapper