import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function SelectionSkeleton() {
    return (<>

        <div className="w-full flex items-center gap-3 p-2">
            <div className="w-full flex flex-col gap-4">
                <Skeleton className="h-12 w-full rounded-lg" />
            </div>
        </div>

    </>
    );

}
