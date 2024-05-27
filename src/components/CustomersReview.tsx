import Image from "next/image"
import { Check, Star } from 'lucide-react'

const CustomersReview = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 lg:gap-12 lg:px-24">
            <div className="shadow-lg rounded-xl p-6 gap-10 flex flex-col justify-between">
                <p className="text-xl italic">“Great platform for hiring local professionals. Found a builder for my project and could not be happier with the results!”</p>

                <div className="flex gap-2">
                    <Image alt="customer-1" width={50} height={100} src={'/user-3.webp'} className="aspect-square rounded-full ring-1 ring-zinc-400 object-cover" />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">Joshua Bell</p>
                            <div className="flex">
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Check size={16} fill="transparent" className="stroke-green-600" />
                            <p className="font-light">Verified Customer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow-lg rounded-xl p-6 gap-10 flex flex-col justify-between">
                <p className="text-xl italic">“The best website for hiring services, I just got my car fixed after a long time. Very good experience. Thanks!!”</p>

                <div className="flex gap-2">
                    <Image alt="customer-1" width={50} height={50} src={'/user-1.jpg'} className="aspect-square rounded-full ring-1 ring-zinc-400" />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">Agustin C. </p>
                            <div className="flex">
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Check size={16} fill="transparent" className="stroke-green-600" />
                            <p className="font-light">Verified Customer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow-lg rounded-xl p-6 gap-10 flex flex-col justify-between">
                <p className="text-xl italic">“Great service by the taskers, I finally found a person who take  my 4 dogs for a walk every morning”</p>

                <div className="flex gap-2">
                    <Image alt="customer-1" width={50} height={100} src={'/user-2.jpg'} className="aspect-square rounded-full ring-1 ring-zinc-400" />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">Sydney S.</p>
                            <div className="flex">
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Check size={16} fill="transparent" className="stroke-green-600" />
                            <p className="font-light">Verified Customer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow-lg rounded-xl p-6 gap-10 flex flex-col justify-between">
                <p className="text-xl italic">“ServiFix connected me with a reliable handyman who fixed my plumbing issues in no time.”</p>

                <div className="flex gap-2">
                    <Image alt="customer-1" width={50} height={100} src={'/user-4.webp'} className="aspect-square rounded-full ring-1 ring-zinc-400" />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">Jean Clay</p>
                            <div className="flex">
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                                <Star size={16} fill="gold" className="stroke-1 stroke-zinc-500" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Check size={16} fill="transparent" className="stroke-green-600" />
                            <p className="font-light">Verified Customer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomersReview