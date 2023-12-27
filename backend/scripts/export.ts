import { prisma } from "../src/helpers/prisma";
import fs from "fs";

const runExport = async () => {
  const categories = await prisma.categories.findMany({});
  fs.writeFileSync("./scripts/categories.json", JSON.stringify(categories));
};

runExport();
