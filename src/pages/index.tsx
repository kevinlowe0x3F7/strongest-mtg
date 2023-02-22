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
  const [cardIds, setCardIds] = React.useState<CardIds>(() =>
    getOptionsForVote(pageProps.count)
  );
  const { data: cards } = api.cards.twoCards.useQuery(cardIds);

  const voteMutation = api.cards.vote.useMutation();

  const id1 = React.useMemo(() => cards?.card1?.int_id, [cards]);
  const id2 = React.useMemo(() => cards?.card2?.int_id, [cards]);
  const handleClick1 = React.useCallback(() => {
    if (id1 == null || id2 == null) {
      return;
    }
    voteMutation.mutate({ votedFor: id1, votedAgainst: id2 });
    setCardIds(() => getOptionsForVote(pageProps.count));
  }, [id1, id2, pageProps.count, voteMutation]);
  const handleClick2 = React.useCallback(() => {
    if (id1 == null || id2 == null) {
      return;
    }
    voteMutation.mutate({ votedFor: id2, votedAgainst: id1 });
    setCardIds(() => getOptionsForVote(pageProps.count));
  }, [id1, id2, pageProps.count, voteMutation]);

  return (
    <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
      <div className="text-3xl font-semibold text-white">
        Which card is cooler?
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
        Cooler
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
