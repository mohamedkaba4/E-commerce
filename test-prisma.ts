import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Client created successfully");
  await prisma.$disconnect();
}

main().catch(console.error);