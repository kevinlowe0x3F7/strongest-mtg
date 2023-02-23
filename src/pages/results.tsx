import type { Card, Votes } from "@prisma/client";
import type { NextPage } from "next";
import { prisma } from "../server/db";
import Image from "next/image";

export interface ResultsPageProps {
  cardAndVotes: CardAndVotes[];
}

interface CardAndVotes {
  card: Card;
  votes: Votes;
}

const Results: NextPage<ResultsPageProps> = ({ cardAndVotes }) => {
  return (
    <div className="my-10 flex w-full max-w-2xl flex-col border">
      {cardAndVotes
        .sort((a, b) => {
          const aPercent = a.votes.votedFor / a.votes.totalVotes;
          const bPercent = b.votes.votedFor / b.votes.totalVotes;
          return bPercent - aPercent;
        })
        .map((cardAndVote) => (
          <div
            className="flex items-center justify-between border-b p-2 text-white"
            key={cardAndVote.card.card_id}
          >
            <div className="flex items-center gap-2">
              <Image
                src={cardAndVote.card.art_image_url}
                alt={cardAndVote.card.name}
                width={64}
                height={64}
              />
              {cardAndVote.card.name}
            </div>
            <div>
              {(
                cardAndVote.votes.votedFor / cardAndVote.votes.totalVotes
              ).toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 1,
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export async function getStaticProps() {
  const votesMap = (await prisma.votes.findMany()).reduce(
    (map, vote) => map.set(vote.cardInt_id, vote),
    new Map<number, Votes>()
  );
  const cards = await prisma.card.findMany({
    where: {
      int_id: {
        in: Array.from(votesMap.values()).map((vote) => vote.cardInt_id),
      },
    },
  });

  const cardAndVotes: CardAndVotes[] = cards
    .map((card) => {
      const votes = votesMap.get(card.int_id);
      if (votes == null) {
        return undefined;
      }

      return {
        card,
        votes,
      };
    })
    .filter(
      (cardAndVotes): cardAndVotes is CardAndVotes => cardAndVotes != null
    );

  return {
    props: {
      cardAndVotes,
    },
    revalidate: 60,
  };
}

export default Results;
