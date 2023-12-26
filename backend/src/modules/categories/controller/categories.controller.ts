import { FastifyReply } from "fastify";

import { prisma } from "../../../helpers/prisma";
import {
  CategoryCreateRequest,
  CategoryDeleteRequest,
  CategoryGetRequest,
  CategoryUpdateRequest,
} from "../schema/categories.schema";

const CategoriesController = (() => {
  return {
    DELETE: async (request: CategoryDeleteRequest, reply: FastifyReply) => {
      try {
        const { categoryId } = request.params;

        const category = await prisma.categories.findUnique({
          where: {
            id: categoryId,
          },
        });

        if (!category) {
          reply.status(404).send();
        }

        const categoryDelete = await prisma.categories.delete({
          where: {
            id: categoryId,
          },
        });

        reply.status(200).send({ data: categoryDelete });
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },

    UPDATE: async (request: CategoryUpdateRequest, reply: FastifyReply) => {
      try {
        const { name, parent, picture } = request.body;

        const { categoryId } = request.params;

        const category = await prisma.categories.findUnique({
          where: {
            id: categoryId,
          },
        });

        if (!category) {
          reply.status(404).send();
        }

        const categoryUpdate = await prisma.categories.update({
          where: {
            id: categoryId,
          },
          data: {
            name: name || undefined,
            picture: picture || undefined,
            parent: parent
              ? {
                  connect: {
                    id: parent,
                  },
                }
              : undefined,
          },
        });

        reply.status(200).send({ data: categoryUpdate });
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },

    GET_ALL: async (_, reply: FastifyReply) => {
      try {
        const categories = await prisma.categories.findMany({
          where: {
            parent: null,
          },
          include: {
            children: {
              include: {
                children: {
                  include: {
                    children: {
                      include: {
                        children: {
                          include: {
                            children: {
                              include: {
                                children: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

        reply.status(200).send({ data: categories });
      } catch (e) {
        reply.status(500).send({ error: e });
      }
    },

    GET: async (request: CategoryGetRequest, reply: FastifyReply) => {
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

    CREATE: async (request: CategoryCreateRequest, reply: FastifyReply) => {
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
