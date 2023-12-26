import { FastifyInstance } from "fastify";
import categoriesRouter from "../modules/categories/router/categories.router";
import productsRouter from "../modules/products/router/products.router";

export const apiRoutes = (fastify: FastifyInstance) => {
  fastify.register(categoriesRouter, {
    prefix: "/category",
  });
  fastify.register(productsRouter, {
    prefix: "/product",
  });
  return fastify;
};
