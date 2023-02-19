import { createTRPCRouter } from "./trpc";
import { cardsRouter } from "./routers/cards";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  cards: cardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type CardsRandomCardInput = RouterInput["cards"]["randomCard"];
export type CardsRandomCardOutput = RouterOutput["cards"]["randomCard"];
