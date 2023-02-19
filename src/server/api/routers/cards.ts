import { createTRPCRouter, publicProcedure } from "../trpc";
import * as Scry from "scryfall-sdk";

export const cardsRouter = createTRPCRouter({
  randomCard: publicProcedure
    .query(async () => {
      const randomCard = await Scry.Cards.random(); 
      return {
        name: randomCard.name,
        image_url: randomCard.getImageURI("normal"),
      };
    }),
});
