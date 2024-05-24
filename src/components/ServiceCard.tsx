/* eslint-disable @next/next/no-img-element */
'use client';

import { allServices as services } from "@/lib/data";
import Link from "next/link";
export default function BlogCard() {


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-content-center items-center">
      {services &&
        services.slice(0, 6).map(service => (
          <div key={service.id} className=" relative h-[300px] flex  flex-col rounded-xl bg-zinc-50 bg-clip-border text-gray-700 shadow-md">
            <div className="relative flex justify-center  -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white ">
              <img
                className="absolute top-0 h-full rounded-xl bg-cover object-cover hover:scale-95 transition-all "
                src={service.url_image}
                alt={service.name}
              />
            </div>
            <div className="p-6">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {service.name}
              </h5>
              <p className="block font-sans text-base font-light leading-none text-inherit antialiased">
                {service.description}
              </p>
            </div>
            <div className="p-6 pt-0 flex justify-end px-12">
              <Link className="select-none rounded-lg bg-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" href={`/services/${service.id}`}>
                Read info
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
