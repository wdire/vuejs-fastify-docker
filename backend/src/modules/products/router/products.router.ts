import { FastifyInstance } from "fastify";

import CategoriesController from "../controller/products.controller";
import { productSchema } from "../schema/products.schema";

async function productsRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/get-all",
    handler: CategoriesController.GET_ALL,
  });

  fastify.route({
    method: "GET",
    url: "/get/:productId",
    handler: CategoriesController.GET,
    schema: productSchema.GET,
  });

  fastify.route({
    method: "POST",
    url: "/create",
    handler: CategoriesController.CREATE,
    schema: productSchema.CREATE,
  });

  fastify.route({
    method: "PATCH",
    url: "/update/:productId",
    handler: CategoriesController.UPDATE,
    schema: productSchema.UPDATE,
  });

  fastify.route({
    method: "DELETE",
    url: "/delete/:productId",
    handler: CategoriesController.DELETE,
    schema: productSchema.DELETE,
  });
}

export default productsRouter;
