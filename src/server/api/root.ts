import { createTRPCRouter } from "@/server/api/trpc";
import { contentRouter } from "@/server/api/routers/content";

export const appRouter = createTRPCRouter({
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
