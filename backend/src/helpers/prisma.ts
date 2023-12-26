import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const basicHealthCheck = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    prisma.$queryRaw`SELECT 1`
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
};
