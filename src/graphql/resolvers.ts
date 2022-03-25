import 'reflect-metadata';
const { prisma } = require('../prisma/prismaClient');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    books: () => prisma.book.findMany(),
    authors: () => prisma.author.findMany(),
    customers: () => prisma.customer.findMany(),
  },
  // Get authors and their books
  Author: {
    books: (parent: any) =>
      prisma.book.findMany({ where: { authorId: parent.id } }),
  },
  // Get customers and their books
  Customer: {
    books: (parent: any) =>
      prisma.book.findMany({ where: { customerId: parent.id } }),
  },
  // Get books and their author
  Book: {
    author: (parent: any) =>
      prisma.author.findUnique({ where: { id: parent.authorId } }),
  },
  Mutation: {
    createUserAccount: async (
      parent: any,
      args: any,
      context: any,
      info: any
    ) => {
      console.log('hitting the resolver in the server');

      console.log(parent);
      console.log(`\n`);
      console.log(args);
      console.log(`\n`);
      console.log(context);
      console.log(`\n`);
      console.log(info);
      const userAccount = await prisma.userAccount.create({
        data: { name: args.name, email: args.email },
      });
      return userAccount;
    },
  },
};
