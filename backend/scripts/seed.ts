import { prisma } from "../src/helpers/prisma";
import categories from "./categories.json";

const runSeed = async () => {
  await prisma.categories.createMany({
    data: categories,
    skipDuplicates: true,
  });
};

runSeed();
