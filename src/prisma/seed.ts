import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.author.upsert({
    where: { email: 'logan@prisma.io' },
    update: { name: 'Logan Garay', email: 'logan@prisma.io', books: undefined },
    create: {
      name: 'Logan Garay',
      email: 'logan@prisma.io',
      books: undefined,
    },
  });
  await prisma.author.upsert({
    where: { email: 'bob@prisma.io' },
    update: { name: 'Bob Vance', email: 'bob@prisma.io', books: undefined },
    create: {
      name: 'Bob Vance',
      email: 'bob@prisma.io',
      books: undefined,
    },
  });
  await prisma.customer.upsert({
    where: { email: 'tod@prisma.io' },
    update: { name: 'Tod Packer', email: 'tod@prisma.io' },
    create: {
      name: 'Tod Packer',
      email: 'tod@prisma.io',
    },
  });
  await prisma.customer.upsert({
    where: { email: 'michael@prisma.io' },
    update: {
      name: 'Michael Scarn',
      email: 'michael@prisma.io',
    },
    create: {
      name: 'Michael Scarn',
      email: 'michael@prisma.io',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
