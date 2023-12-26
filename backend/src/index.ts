import fastify from "fastify";
import pino from "pino";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { apiRoutes } from "./helpers/api-routes";
import { basicHealthCheck } from "./helpers/prisma";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

server.get("/ping", async () => {
  return "pong\n";
});

const port = Number(process.env.API_PORT) || 5000;

const startServer = async () => {
  try {
    const server = fastify({
      logger: pino({ level: "info" }),
    });
    server.register(cors);
    server.register(helmet);
    server.register(apiRoutes, { prefix: "/api" });
    server.setErrorHandler((error, request, reply) => {
      reply.status(500).send(error);
      //server.log.error(error);
    });

    server.get("/", (request, reply) => {
      reply.send("konnichiwa world");
    });
    server.get("/health-check", async (request, reply) => {
      try {
        await basicHealthCheck();
        reply.status(200).send();
      } catch (e) {
        reply.status(500).send();
      }
    });
    server.addHook("onListen", async () => {
      console.log("Started listening on :" + port);
    });
    await server.listen({
      port: port,
      host: "0.0.0.0", // docker host port forward doesn't work without this
    });
  } catch (e) {
    console.error(e);
  }
};

startServer();
