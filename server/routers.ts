import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { answerDocsQuestion } from "./docsAssistant";
import { recordAssistantFeedback, logUnansweredQuestion } from "./db";
import { z } from "zod";

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
    feedback: publicProcedure
      .input(
        z.object({
          edition: z.enum(["shared", "dedicated"]),
          question: z.string().min(1).max(600),
          answer: z.string().min(1).max(2000),
          rating: z.enum(["helpful", "unhelpful"]),
          comment: z.string().max(500).optional(),
        }),
      )
      .mutation(async ({ input }) => {
        await recordAssistantFeedback({
          edition: input.edition,
          question: input.question,
          answer: input.answer,
          rating: input.rating,
          comment: input.comment ?? null,
        });
        return { success: true } as const;
      }),
    trackUnanswered: publicProcedure
      .input(
        z.object({
          edition: z.enum(["shared", "dedicated"]),
          question: z.string().min(1).max(600),
          reason: z.string().min(1).max(64),
        }),
      )
      .mutation(async ({ input }) => {
        await logUnansweredQuestion({
          edition: input.edition,
          question: input.question,
          reason: input.reason,
        });
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
