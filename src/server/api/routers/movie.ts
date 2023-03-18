import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const movieRouter = createTRPCRouter({
  getRecent: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movie.findMany();
  }),

  getFeaturedMovie: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movieFeatured.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        movie: true,
      },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
