import { FastifyInstance } from "fastify";

import CategoriesController from "../controller/categories.controller";
import { categorySchema } from "../schema/categories.schema";

async function categoriesRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/get-all",
    handler: CategoriesController.GET_ALL,
  });

  fastify.route({
    method: "GET",
    url: "/get/:categoryId",
    handler: CategoriesController.GET,
    schema: categorySchema.GET,
  });

  fastify.route({
    method: "POST",
    url: "/create",
    handler: CategoriesController.CREATE,
    schema: categorySchema.CREATE,
  });

  fastify.route({
    method: "PATCH",
    url: "/update/:categoryId",
    handler: CategoriesController.UPDATE,
    schema: categorySchema.UPDATE,
  });

  fastify.route({
    method: "DELETE",
    url: "/delete/:categoryId",
    handler: CategoriesController.DELETE,
    schema: categorySchema.DELETE,
  });
}

export default categoriesRouter;
