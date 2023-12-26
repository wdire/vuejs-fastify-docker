import { FastifyReply } from "fastify";

import { prisma } from "../../../helpers/prisma";
import {
  ProductCreateRequest,
  ProductDeleteRequest,
  ProductGetRequest,
  ProductUpdateRequest,
} from "../schema/products.schema";

const ProductsController = (() => {
  return {
    DELETE: async (request: ProductDeleteRequest, reply: FastifyReply) => {
      try {
        const { productId } = request.params;

        const product = await prisma.products.findUnique({
          where: {
            id: productId,
          },
        });

        if (!product) {
          reply.status(404).send();
        }

        const productDelete = await prisma.products.delete({
          where: {
            id: productId,
          },
        });

        reply.status(200).send({ data: productDelete });
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },

    UPDATE: async (request: ProductUpdateRequest, reply: FastifyReply) => {
      try {
        const { name, category, picture } = request.body;

        const { productId } = request.params;

        const product = await prisma.products.findUnique({
          where: {
            id: productId,
          },
        });

        if (!product) {
          reply.status(404).send();
        }

        const productUpdate = await prisma.products.update({
          where: {
            id: productId,
          },
          data: {
            name: name || undefined,
            picture: picture || undefined,
            category_id: category
              ? {
                  connect: {
                    id: category,
                  },
                }
              : undefined,
          },
        });

        reply.status(200).send({ data: productUpdate });
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },

    GET_ALL: async (_, reply: FastifyReply) => {
      try {
        const products = await prisma.products.findMany();

        reply.status(200).send({ data: products });
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },

    GET: async (request: ProductGetRequest, reply: FastifyReply) => {
      try {
        const { productId } = request.params;

        const product = await prisma.products.findUnique({
          where: {
            id: productId,
          },
        });

        if (product) {
          reply.status(200).send({ data: product });
        } else {
          reply.status(404).send();
        }
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },

    CREATE: async (request: ProductCreateRequest, reply: FastifyReply) => {
      try {
        const { name, category, picture } = request.body;

        const product = await prisma.products.create({
          data: {
            name,
            picture,
            category_id: category && {
              connect: {
                id: category,
              },
            },
          },
        });

        reply.status(201).send({ data: product });
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },
  };
})();

export default ProductsController;
