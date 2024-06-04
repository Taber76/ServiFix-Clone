import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function PostSkeleton() {
    return (<>

        <div className="w-full flex items-center gap-3 p-2">
            <div>
                <Skeleton className="flex rounded-lg size-28 md:size-40" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-4 w-1/5 rounded-lg mb-6" />
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-8/12 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
        </div>


        <div className="w-full flex items-center gap-3 p-2">
            <div>
                <Skeleton className="flex rounded-lg size-28 md:size-40" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-4 w-1/5 rounded-lg mb-6" />
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-8/12 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
        </div>

        <div className="w-full flex items-center gap-3 p-2">
            <div>
                <Skeleton className="flex rounded-lg size-28 md:size-40" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-4 w-1/5 rounded-lg mb-6" />
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-8/12 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
        </div>
    </>
    );

}
