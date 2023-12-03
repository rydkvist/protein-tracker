import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const macrosRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        proteins: z.number(),
        carbs: z.number(),
        fats: z.number(),
        calories: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.macros.create({
        data: {
          name: input.name,
          proteins: input.proteins,
          carbs: input.carbs,
          fats: input.fats,
          calories: input.calories,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        proteins: z.number().optional(),
        carbs: z.number().optional(),
        fats: z.number().optional(),
        calories: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.macros.update({
        where: {
          id: input.id,
          createdBy: { id: ctx.session.user.id },
        },
        data: {
          name: input.name,
          proteins: input.proteins,
          carbs: input.carbs,
          fats: input.fats,
          calories: input.calories,
        },
      });
    }),
  getAllMacros: protectedProcedure.query(async ({ ctx }) => {
    const macros = await ctx.db.macros.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });

    return macros;
  }),
  getMacrosFrom: protectedProcedure
    .input(z.date())
    .query(async ({ ctx, input }) => {
      const macros = await ctx.db.macros.findFirst({
        orderBy: { createdAt: "desc" },
        where: {
          createdAt: input,
          createdBy: { id: ctx.session.user.id },
        },
      });

      return macros;
    }),
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.macros.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});
