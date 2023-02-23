import Link from "next/link";
import * as React from "react";

export const NavBar: React.FC = () => {
  return (
    <div className="col-span-1 flex h-10 w-full items-center gap-3 border-b-[1px] border-gray-50 bg-[#2e026d] p-2">
      <Link className="text-white" href="/">
        Home
      </Link>
      <Link className="text-white" href="/results">
        Results
      </Link>
    </div>
  );
};
