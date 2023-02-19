import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import { type NextPage } from "next";

import { api } from "../utils/api";
import Image from "next/image";
import { CardsRandomCardOutput } from "../server/api/root";

const Home: NextPage = () => {
  const card1 = api.cards.randomCard.useQuery(undefined);
  const card2 = api.cards.randomCard.useQuery(undefined);

  const handleClick1 = React.useCallback(
    () => console.log("I got clicked", card1),
    [card1]
  );
  const handleClick2 = React.useCallback(
    () => console.log("I got clicked", card2),
    [card2]
  );
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <div className="text-3xl font-semibold text-white">
        Which card is stronger?
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-4 md:gap-8">
        {card1.data == null ? (
          <CircularProgress />
        ) : (
          <LoadedCard card={card1.data} handleClick={handleClick1} />
        )}
        {card2.data == null ? (
          <CircularProgress />
        ) : (
          <LoadedCard card={card2.data} handleClick={handleClick2} />
        )}
      </div>
    </div>
  );
};

interface LoadedCardProps {
  card: CardsRandomCardOutput;
  handleClick: () => void;
}

const LoadedCard: React.FC<LoadedCardProps> = ({ card, handleClick }) => {
  const image =
    card.image_url != null ? (
      <Image src={card.image_url} alt={card.name} width={244} height={340} />
    ) : (
      <div>Card image not found</div>
    );

  return (
    <div className="flex flex-col items-center">
      <div>{card.name}</div>
      {image}
      <Button onClick={handleClick} variant="contained">
        Stronger
      </Button>
    </div>
  );
};

export default Home;
