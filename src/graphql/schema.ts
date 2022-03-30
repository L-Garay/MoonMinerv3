import { ApolloServer, gql } from 'apollo-server-hapi';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
    content: String
    published: Boolean
    authorId: Int
    customerId: Int
  }
  type Author {
    id: Int
    email: String
    name: String
    books: [Book]
  }
  type Customer {
    id: Int
    email: String
    name: String
    books: [Book]
  }
  type UserAccount {
    id: Int
    email(email: String): String
    name: String
    games: [Game]
  }
  type Game {
    id: Int
    name: String
    createdAt: String
    updatedAt: String
    userAccountId: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
    customers: [Customer]
    games: [Game]
    userAccount(email: String): UserAccount
  }

  type Mutation {
    createUserAccount(name: String, email: String): UserAccount
    createGame(name: String, id: Int): Game
  }
`;
