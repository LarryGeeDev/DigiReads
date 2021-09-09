const { gql } = require("apollo-server-express")

const typeDef = gql`
    type Query {
        getAuthors(limit: Int): [Author]
        getAuthor(id: String!): Author
  }
  type Mutation {
      deleteAuthor(id: String!): Author
      createNewAuthor(input: AuthorInput!, userId: String!): Author
      updateAuthor(id: String!, input: UpdateInput!): Author
      updateBookList(author_id: String!, input: BookInput!): String

      createNewUser(input: UserInput!): User
      login(email: String!, password: String!): User
      updateUser(id: String!, input: UpdUserInput!): User
  }

  type User {
    id: String
    firstName: String!
    lastName: String!
    email: String!
    phoneNo: String
    user_category: UserCat!
    profile_pic: String
    date_created: String
    token: String!
  }
  type Author {
      id: String
      user_id: String!
      name: String!
      status: AuthorStatus!,
      books: [Book]!
      market_tag: MarketTag,
      author_bio: String
      date_created: String
  }
  type Book {
    title: String
    desc: String
    content: String
    audio: String
    price: String
    date_added: String
    image: String
  }
  input BookInput {
    title: String!
    desc: String!
    content: String!
    audio: String
    price: String!
    image: String
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    phoneNo: String
    user_category: UserCat!
    profile_pic: String
    password: String!
  }
  input UpdUserInput {
    firstName: String
    lastName: String
    email: String
    phoneNo: String
    user_category: UserCat
    profile_pic: String
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
  enum UserCat {
    READER,
    AUTHOR
  }
`

module.exports = typeDef