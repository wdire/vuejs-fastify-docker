import { FastifyInstance } from "fastify";
import categoriesRouter from "../modules/categories/router/categories.router";

export const apiRoutes = (fastify: FastifyInstance) => {
  fastify.register(categoriesRouter, {
    prefix: "/category",
  });
  return fastify;
};
