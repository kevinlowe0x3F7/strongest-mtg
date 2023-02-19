import { createTRPCRouter } from "./trpc";
import { cardsRouter } from "./routers/cards";

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
