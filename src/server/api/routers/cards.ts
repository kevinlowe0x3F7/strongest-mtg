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
        throw new Error("Did not find two cards in database that match ids", input);
      }

      return {
        card1: cards[0],
        card2: cards[1],
      };
      /*
      return {
        id1: "89c5dec1-cefe-4ce3-a9df-b5cb9fa73b35",
        name1: "Twisted Justice",
        image_url1: "https://cards.scryfall.io/normal/front/d/8/d8efa02d-c301-47e1-8cdf-26ff9e97a243.jpg?1598917592",
        id2: "7721e800-fba6-4ae7-855e-631b2ecc8d6b",
        name2: "Chandra, Flame's Catalyst",
        image_url2: "https://cards.scryfall.io/normal/front/1/e/1e49ce44-5286-4310-88c2-f8a1402b113b.jpg?1596168039",
      };
      */
    }),
});
