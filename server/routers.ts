import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { answerDocsQuestion } from "./docsAssistant";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  docs: router({
    ask: publicProcedure
      .input(
        z.object({
          question: z.string().trim().min(1).max(600),
          edition: z.enum(["shared", "dedicated"]).default("shared"),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const requestKey = ctx.req.ip ?? "public-docs";
        return answerDocsQuestion({ ...input, requestKey });
      }),
  }),
});

export type AppRouter = typeof appRouter;
