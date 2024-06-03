'use client'

import CustomersReview from "@/components/CustomersReview";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Select from "@/components/ui/Select";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServiceCard from '@/components/ServiceCard'
import WordRotate from "@/components/magicui/word-rotate";
import { DialogModal } from "@/components/Dialog";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";


export default function Home() {

  const isLoggedIn = false

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const handleClick = () => {
    isLoggedIn ? setIsModalOpen(false) : setIsModalOpen(true)

    if (isLoggedIn) {
      router.push('/become-a-tasker')
    }
  }

  return (

    <main className="bg-zinc-50 text-zinc-950">
      {/* Main */}
      <section className=" w-full py-8 lg:py-14 flex flex-col justify-center">
        <MaxWidthWrapper>
          <div className="flex flex-col text-center justify-center items-center gap-7">
            <div className=" flex flex-col gap-6 items-center justify-center">
              <h1 className="text-5xl lg:text-7xl font-bold">Search & Hire {
                <WordRotate
                  className="text-4xl lg:text-6xl font-bold text-green-600"
                  words={[
                    "Professionals",
                    "Taskers",
                    "Talents",
                    "Experts",
                    "Specialists",
                    "Contractors",
                    "Freelancers",
                    "Workers",
                    "Service Providers",
                    "Technicians",
                    "Artisans",
                    "Consultants",
                    "Practitioners",
                    "Personnel",
                    "Craftsmen",
                    "Labor",
                    "Technologists",
                    "Assistants",
                    "Helpers",
                    "Aides"
                  ]} />
              }</h1>
              <h3 className="text-xl ">Go ahead a find your new tasker</h3>
              <Select />
            </div>

            <Image src={'/main.jpg'} alt="Builders" width={1024} height={10} className="rounded-xl aspect-[3/2] shadow-lg" />
          </div>
        </MaxWidthWrapper >
      </section>

      {/* Popular services */}
      <section className="w-full py-6 flex flex-col justify-center items-center bg-zinc-100">
        <MaxWidthWrapper>
          <h2 className="text-5xl font-bold text-center mb-16">Popular Services</h2>
          <div>

            <div className="grid place-content-center">
              <ServiceCard />
            </div>
            <div className="flex justify-end">
              <Link href={'/services'} className=" transition-all hidden md:flex justify-end gap-2 p-2 mt-4">See all services <ArrowRight /> </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* What our customers say */}
      <section className=" w-full py-16 flex flex-col justify-center items-center bg-zinc-50">
        <MaxWidthWrapper>
          <h2 className="text-5xl text-center mb-12 font-bold ">What our customers say?</h2>
          <div>
            <CustomersReview />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* How does it work? */}
      <section id="about" className=" w-full py-16 flex flex-col justify-center items-center bg-zinc-100">
        <MaxWidthWrapper>
          <div className="flex gap-12 justify-between items-center flex-col lg:flex-row">


            <div className="flex flex-col gap-4">
              <h2 className="text-5xl mb-6 font-bold text-center">How does it work?</h2>
              <div className="flex gap-4 items-center">
                <span className="rounded-full border-2 border-green-600 p-4 flex items-center justify-center border-dashed size-6">1</span>
                <div>
                  <p className="text-lg font-semibold">
                    Choose a Tasker by price, skills, and reviews.
                  </p>
                  <p className="font-light">
                    Find the perfect professional for your needs by browsing through detailed profiles. Compare prices, evaluate skills, and read reviews from previous clients to make an informed decision. Ensuring you get the best match for the job has never been easier.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <span className="rounded-full border-2 border-green-600 p-4 flex items-center justify-center border-dashed size-6">2</span>
                <div>
                  <p className="text-lg font-semibold">
                    Schedule a Tasker as early as today.
                  </p>
                  <p className="font-light">
                    Need help quickly? Schedule a qualified Tasker to come to your aid as soon as today. Flexible availability means you can find someone who fits your schedule, whether it is a last-minute emergency or a planned task
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <span className="rounded-full border-2 border-green-600 p-4 flex items-center justify-center border-dashed size-6">3</span>
                <div>
                  <p className="text-lg font-semibold">
                    Chat, pay, tip, and review all in one place.
                  </p>
                  <p className="font-light">Enjoy seamless communication and transaction management within our platform. Chat directly with your Tasker to coordinate details, make secure payments, leave a tip for exceptional service, and provide a review—all from one convenient location.</p>
                </div>
              </div>

            </div>

            <Image src='/how-it-works.svg' width={100} height={100} alt="how-it-works" className="w-4/5 aspect-[4/5] md:w-1/2 md:aspect-square" />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Become a tasker */}
      <section id="join-us" className=" w-full py-16 flex flex-col justify-center items-center bg-zinc-50">
        <MaxWidthWrapper>
          <div className="flex gap-12 px-6 justify-between items-center flex-col-reverse lg:flex-row">
            <Image src='/become-tasker.svg' width={400} height={100} alt="how-it-works" className="w-4/5 aspect-[4/5] md:w-[400px] md:aspect-square" />

            <div className="flex flex-col gap-4">
              <div className="pb-6 text-center">
                <h2 className="text-5xl font-bold text-center">Become a Tasker</h2>
                <p className="font-light">Join the ServiFix Community and Start Earning!</p>
              </div>
              <p >
                Are you skilled in a trade or have a service to offer? Join ServiFix and turn your talents into income. Whether you are an experienced electrician, a talented painter, a professional chef, or a skilled builder, there is a place for you in our community.
              </p>
              <div className="flex gap-2 items-center">
                <Check size={22} fill="transparent" className="stroke-green-600" />
                <p>Flexible Schedule</p>
              </div>
              <div className="flex gap-2 items-center">
                <Check size={22} fill="transparent" className="stroke-green-600" />
                <p>Reliable Income</p>
              </div>
              <div className="flex gap-2 items-center">
                <Check size={22} fill="transparent" className="stroke-green-600" />
                <p>Diverse Opportunities</p>
              </div>
              <div className="flex gap-2 items-center">
                <Check size={22} fill="transparent" className="stroke-green-600" />
                <p>Community Support</p>
              </div>

              <Button
                onClick={() => handleClick()}
                className='flex items-center gap-1 justify-center w-4/5 md:w-2/3 lg:w-1/2 self-center bg-green-600 p-2 rounded-md text-white hover:bg-green-700 transition-all px-4 mt-10'>
                Get started
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <DialogModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </main>
  );
}
