import { FastifyReply } from "fastify";

import { prisma } from "../../../helpers/prisma";
import {
  CategoryCreateRequest,
  CategoryGetRequest,
} from "../schema/categories.schema";

const CategoriesController = (() => {
  return {
    get: async (request: CategoryGetRequest, reply: FastifyReply) => {
      try {
        const { categoryId } = request.params;

        const category = await prisma.categories.findUnique({
          where: {
            id: categoryId,
          },
        });

        if (category) {
          reply.status(200).send({ data: category });
        } else {
          reply.status(404).send();
        }
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },

    create: async (request: CategoryCreateRequest, reply: FastifyReply) => {
      try {
        const { name, parent, picture } = request.body;

        const category = await prisma.categories.create({
          data: {
            name,
            picture,
            parent: parent && {
              connect: {
                id: parent,
              },
            },
          },
        });

        reply.status(201).send({ data: category });
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },
  };
})();

export default CategoriesController;
