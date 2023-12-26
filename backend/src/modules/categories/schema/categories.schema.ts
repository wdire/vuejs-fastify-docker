import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest } from "fastify";

export const categorySchema = {
  CREATE: {
    body: Type.Object({
      name: Type.String(),
      picture: Type.Optional(Type.String()),
      parent: Type.Optional(Type.String()),
    }),
  },
  GET: {
    params: Type.Object({
      categoryId: Type.String({
        minLength: 1,
      }),
    }),
  },
  UPDATE: {
    params: Type.Object({
      categoryId: Type.String({
        minLength: 1,
      }),
    }),
    body: Type.Object(
      {
        name: Type.Optional(Type.String()),
        picture: Type.Optional(Type.String()),
        parent: Type.Optional(Type.String()),
      },
      {
        minProperties: 1,
      }
    ),
  },
  DELETE: {
    params: Type.Object({
      categoryId: Type.String({
        minLength: 1,
      }),
    }),
  },
};

export type CategoryGetRequest = FastifyRequest<{
  Params: Static<typeof categorySchema.GET.params>;
}>;

export type CategoryCreateRequest = FastifyRequest<{
  Body: Static<typeof categorySchema.CREATE.body>;
}>;

export type CategoryUpdateRequest = FastifyRequest<{
  Body: Static<typeof categorySchema.UPDATE.body>;
  Params: Static<typeof categorySchema.UPDATE.params>;
}>;

export type CategoryDeleteRequest = FastifyRequest<{
  Params: Static<typeof categorySchema.DELETE.params>;
}>;
