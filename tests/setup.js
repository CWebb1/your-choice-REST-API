import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

before(async () => {
  // Setup test database or any other test requirements
  await prisma.$connect();
});

after(async () => {
  // Cleanup after all tests
  await prisma.$disconnect();
});
