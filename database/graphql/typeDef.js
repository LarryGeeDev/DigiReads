const { gql } = require("apollo-server-express")

const typeDef = gql`
    type Query {
        getAuthors(limit: Int): [Author]
        getAuthor(id: String!): Author
  }
  type Mutation {
      deleteAuthor(id: String!): Author
      createNewAuthor(input: AuthorInput!): Author
      updateAuthor(id: String!, input: UpdateInput!): Author
  }
  type Author {
      id: String
      name: String!
      status: AuthorStatus!,
      books: [Book]
      market_tag: MarketTag,
      author_bio: String
      date_created: String
  }
  type Book {
    id: String!
    title: String
    desc: String
    content: String
    audio: String
    price: String
    date_added: String
    image: String
  }
  input AuthorInput {
    name: String!
    books: [BookInput]
    market_tag: MarketTag,
    author_bio: String
    status: AuthorStatus!
  }
  input UpdateInput {
    name: String
    author_bio: String
  }
  input BookInput {
    id: String!
    title: String!
    desc: String!
    content: String!
    audio: String
    price: String!
    date_added: String!
    image: String
  }
  enum AuthorStatus {
      BEST_SELLER,
      RISING,
      NEW
  }
  enum MarketTag {
      FEATURED,
      SELLING_FAST,
      INTERESTING
  }
`

module.exports = typeDef