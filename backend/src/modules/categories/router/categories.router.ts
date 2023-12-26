import { FastifyInstance } from "fastify";

import CategoriesController from "../controller/categories.controller";
import { categorySchema } from "../schema/categories.schema";

async function categoriesRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/get/:categoryId",
    handler: CategoriesController.get,
    schema: categorySchema.get,
  });

  fastify.route({
    method: "POST",
    url: "/create",
    handler: CategoriesController.create,
    schema: categorySchema.create,
  });

  return fastify;
}

export default categoriesRouter;
