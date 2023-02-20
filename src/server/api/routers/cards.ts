import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const cardsRouter = createTRPCRouter({
  twoCards: publicProcedure
    .input(z.object({ firstId: z.number().gte(1), secondId: z.number().gte(1) }))
    .query(async ({ input }) => {
      const cards = await prisma.card.findMany({ where: {
        int_id: {
          in: [input.firstId, input.secondId],
        }
      }});

      if (cards.length !== 2) {
        throw new Error("Did not find two cards in database that match ids");
      }

      return {
        card1: cards[0],
        card2: cards[1],
      };
    }),
  vote: publicProcedure
    .input(z.object({ votedFor: z.number().gte(1), votedAgainst: z.number().gte(1), }))
    .mutation(async ({ input }) => {
      const votes = await prisma.$transaction(
        [
        prisma.votes.upsert(upsertVote(true, input.votedFor)),
        prisma.votes.upsert(upsertVote(false, input.votedAgainst)),
        ]
      );
      return votes;
    })
});

const upsertVote = (votedFor: boolean, id: number): Prisma.VotesUpsertArgs  => {
  return {
        where: {
          cardInt_id: id
        },
        create: {
          cardInt_id: id,
          votedFor: votedFor ? 1 : 0,
          totalVotes: 1,
        },
        update: {
          votedFor: {
            increment: votedFor ? 1 : 0
          },
          totalVotes: {
            increment: 1
          }
        }
      };
}
