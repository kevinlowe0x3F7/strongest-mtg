import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import { type NextPage } from "next";

import { api } from "../utils/api";
import Image from "next/image";
import { prisma } from "../server/db";
import { getOptionsForVote } from "../utils/randomCard";

interface HomeProps {
  count: number;
}

interface CardIds {
  firstId: number;
  secondId: number;
}

const Home: NextPage<HomeProps> = (pageProps) => {
  console.log("got count from server", pageProps.count);
  const [cardIds, setCardIds] = React.useState<CardIds>(() =>
    getOptionsForVote(pageProps.count)
  );
  console.log("random card ids", cardIds);
  const { data: cards } = api.cards.twoCards.useQuery(cardIds);
  console.log("cards", cards);

  const voteMutation = api.cards.vote.useMutation();

  const id1 = React.useMemo(() => cards?.card1?.int_id, [cards]);
  const id2 = React.useMemo(() => cards?.card2?.int_id, [cards]);
  const handleClick1 = React.useCallback(() => {
    console.log("I got clicked", id1);
    if (id1 == null) {
      return;
    }
    const votes = voteMutation.mutate({ votedFor: id1, votedAgainst: id2 });
    console.log("votes", votes);
    setCardIds(() => getOptionsForVote(pageProps.count));
  }, [id1, id2, pageProps.count, voteMutation]);
  const handleClick2 = React.useCallback(() => {
    if (id2 == null) {
      return;
    }
    const votes = voteMutation.mutate({ votedFor: id2, votedAgainst: id1 });
    console.log("votes", votes);
    setCardIds(() => getOptionsForVote(pageProps.count));
  }, [id1, id2, pageProps.count, voteMutation]);

  return (
    <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
      <div className="text-3xl font-semibold text-white">
        Which card is stronger?
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-4 md:gap-8">
        <Card
          image_url={cards?.card1?.image_url}
          name={cards?.card1?.name}
          handleClick={handleClick1}
        />
        <Card
          image_url={cards?.card2?.image_url}
          name={cards?.card2?.name}
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
        <Image
          src={image_url}
          alt={name}
          width={244}
          height={340}
          priority={true}
        />
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

export async function getStaticProps() {
  const count = await prisma.card.count();
  return {
    props: {
      count,
    },
  };
}

export default Home;
