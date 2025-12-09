import { prisma } from "../src/lib/prisma.js";

async function main() {
  const publisherRole = await prisma.role.upsert({
    where: { name: "publisher" },
    update: {},
    create: { name: "publisher" },
  });
  const userRole = await prisma.role.upsert({
    where: { name: "normal" },
    update: {},
    create: { name: "normal" },
  });

  console.log({ userRole, publisherRole });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
