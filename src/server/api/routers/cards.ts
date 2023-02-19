import { createTRPCRouter, publicProcedure } from "../trpc";
import * as Scry from "scryfall-sdk";

export const cardsRouter = createTRPCRouter({
  randomCard: publicProcedure
    .query(() => {
      /*
      const [randomCard, anotherRandomCard] = await Promise.all([Scry.Cards.random(), Scry.Cards.random()]);
      return {
        id: randomCard.oracle_id,
        name: randomCard.name,
        image_url: randomCard.getImageURI("normal"),
      };
      */
      return {
        id: "89c5dec1-cefe-4ce3-a9df-b5cb9fa73b35",
        name: "Twisted Justice",
        image_url: "https://cards.scryfall.io/normal/front/d/8/d8efa02d-c301-47e1-8cdf-26ff9e97a243.jpg?1598917592",
      };
    }),
});
