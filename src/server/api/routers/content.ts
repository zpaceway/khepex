import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const contentRouter = createTRPCRouter({
  getRecent: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.content.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getSponsoredContent: publicProcedure.query(async ({ ctx }) => {
    const sponsoredContent = await ctx.prisma.sponsoredContent.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        content: true,
      },
    });

    return sponsoredContent?.content;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
