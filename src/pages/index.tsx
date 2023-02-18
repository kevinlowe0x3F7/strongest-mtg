import * as React from "react";
import { Button } from "@mui/material";
import { type NextPage } from "next";
import Link from "next/link";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const handleClick = React.useCallback(() => console.log("I got clicked"), []);
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <div className="text-3xl font-semibold text-white">
        Which card is stronger?
      </div>
      <div className="grid grid-cols-2 grid-rows-1 justify-items-center gap-4 md:gap-8">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="https://create.t3.gg/en/usage/first-steps"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">First Steps →</h3>
          <div className="text-lg">
            Just the basics - Everything you need to know to set up your
            database and authentication.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="https://create.t3.gg/en/introduction"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Documentation →</h3>
          <div className="text-lg">
            Learn more about Create T3 App, the libraries it uses, and how to
            deploy it.
          </div>
        </Link>
        <Button onClick={handleClick} variant="contained">
          Stronger
        </Button>
        <Button onClick={handleClick} variant="contained">
          Stronger
        </Button>
      </div>
      <p className="text-2xl text-white">
        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
      </p>
    </div>
  );
};

export default Home;
