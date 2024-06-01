import React from "react";
import { Chip } from "@nextui-org/react";
import VerifiedIcon from "@/components/icons/VerifiedIcon";

export default function VerifiedBadge() {
  return (
    <Chip
      startContent={<VerifiedIcon className="size-3 md:size-5 stroke-sky-600 " />}
      variant="faded"
      className="text-xs shadow-none ring-0 border-1 "
    >
      Verified
    </Chip>
  );
}
