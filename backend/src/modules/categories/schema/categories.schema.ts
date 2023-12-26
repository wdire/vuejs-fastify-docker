import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest } from "fastify";

export const categorySchema = {
  create: {
    body: Type.Object({
      name: Type.String(),
      picture: Type.Optional(Type.String()),
      parent: Type.Optional(Type.String()),
    }),
  },
  get: {
    params: Type.Object({
      categoryId: Type.String({
        minLength: 1,
      }),
    }),
  },
};

export type CategoryCreateRequest = FastifyRequest<{
  Body: Static<typeof categorySchema.create.body>;
}>;

export type CategoryGetRequest = FastifyRequest<{
  Params: Static<typeof categorySchema.get.params>;
}>;
