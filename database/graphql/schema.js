const { gql } = require("apollo-server-express")

const typeDef = gql`
    type Query {
        hello(greet: String): String
        getAuthors(limit: Int): Author
  }
  type Author {
      id: String
      name: String!
      status: AuthorStatus!,
      books: [Books]
      market_tag: MarketTag,
      author_bio: String
      date_created: String
  }
  type Books {
    id: String
    title: String
    desc: String
    content: String
    audio: String
    price: String
    date_added: String
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