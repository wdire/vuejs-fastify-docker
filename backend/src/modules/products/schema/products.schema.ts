import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest } from "fastify";

export const productSchema = {
  CREATE: {
    body: Type.Object({
      name: Type.String(),
      picture: Type.Optional(Type.String()),
      category: Type.String(),
    }),
  },
  GET: {
    params: Type.Object({
      productId: Type.String({
        minLength: 1,
      }),
    }),
  },
  UPDATE: {
    params: Type.Object({
      productId: Type.String({
        minLength: 1,
      }),
    }),
    body: Type.Object(
      {
        name: Type.Optional(Type.String()),
        picture: Type.Optional(Type.String()),
        category: Type.Optional(Type.String()),
      },
      {
        minProperties: 1,
      }
    ),
  },
  DELETE: {
    params: Type.Object({
      productId: Type.String({
        minLength: 1,
      }),
    }),
  },
};

export type ProductGetRequest = FastifyRequest<{
  Params: Static<typeof productSchema.GET.params>;
}>;

export type ProductCreateRequest = FastifyRequest<{
  Body: Static<typeof productSchema.CREATE.body>;
}>;

export type ProductUpdateRequest = FastifyRequest<{
  Body: Static<typeof productSchema.UPDATE.body>;
  Params: Static<typeof productSchema.UPDATE.params>;
}>;

export type ProductDeleteRequest = FastifyRequest<{
  Params: Static<typeof productSchema.DELETE.params>;
}>;
