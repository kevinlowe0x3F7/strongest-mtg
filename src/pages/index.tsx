import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import { type NextPage } from "next";

import { api } from "../utils/api";
import Image from "next/image";

const Home: NextPage = () => {
  const cards = api.cards.twoRandomCards.useQuery(undefined);

  const handleClick1 = React.useCallback(() => {
    if (cards.data?.id1 == null) {
      return;
    }
    console.log("I got clicked", cards.data.id1);
  }, [cards.data?.id1]);
  const handleClick2 = React.useCallback(() => {
    if (cards.data?.id2 == null) {
      return;
    }
    console.log("I got clicked", cards.data.id2);
  }, [cards.data?.id2]);

  return (
    <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
      <div className="text-3xl font-semibold text-white">
        Which card is stronger?
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-4 md:gap-8">
        <Card
          image_url={cards.data?.image_url1}
          name={cards.data?.name1}
          handleClick={handleClick1}
        />
        <Card
          image_url={cards.data?.image_url2}
          name={cards.data?.name2}
          handleClick={handleClick2}
        />
      </div>
    </div>
  );
};

interface CardProps {
  image_url: string | undefined;
  name: string | undefined;
  handleClick: () => void;
}

const Card: React.FC<CardProps> = ({ image_url, name, handleClick }) => {
  const cardContent =
    name != null && image_url != null ? (
      <>
        <div className="text-white">{name}</div>
        <div className="py-2" />
        <Image src={image_url} alt={name} width={244} height={340} />
        <div className="py-2" />
      </>
    ) : (
      <>
        <div className="flex h-[340px] w-[244px] items-center justify-center">
          <CircularProgress />
        </div>
        <div className="py-2" />
      </>
    );

  return (
    <div className="flex flex-col items-center">
      {cardContent}
      <Button disabled={name == null} onClick={handleClick} variant="contained">
        Stronger
      </Button>
    </div>
  );
};

export default Home;
