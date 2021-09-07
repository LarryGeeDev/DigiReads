const Authors = require("../models/authorSchema");
const User = require("../models/userSchema");

const root = {
  Query: {
    // get all authors
    getAuthors: (_, args, context, ___) =>
      new Promise((resolve, reject) => {
        const limit = args.limit || null;
        Authors.find()
          .limit(limit)
          .sort("desc")
          .then((collection) => {
            resolve(collection);
          })
          .catch((err) =>
            reject(
              new Error(
                "An error occurred while retrieving this collection: " + err
              )
            )
          );
      }),
    // get a author
    getAuthor: (_, args, __, ___) =>
      new Promise((resolve, reject) => {
        Authors.findById(args.id)
          .then((doc) => resolve(doc))
          .catch((err) => reject(err));
      }),
  },
  Mutation: {
    // delete an author
    deleteAuthor: (_, args, __, ___) => {
      return new Promise((resolve, reject) => {
        Authors.findByIdAndDelete(args.id)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
      });
    },
    // create an author
    createNewAuthor: (_, args, __, ___) => {
        const newDoc = {
            name: args.input.name,
            status: args.input.status,
            user_id: args.userId,
            books: args.input.books,
            market_tag: args.market_tag,
            author_bio: args.input.author_bio,
            date_created: Date.now()
        }
        return new Promise((resolve, reject) => {
            new Authors(newDoc).save()
                    .then(doc => resolve(doc))
                    .catch(err => reject(err))
        })
    },
    // update an author
    updateAuthor: (_, args, __, ___) => {
        const updatedAuthor = {
            name: args.input.name,
            author_bio: args.input.author_bio
        }
        return new Promise((resolve, reject) => {
            Authors.findByIdAndUpdate(args.id, updatedAuthor)
            .then(doc => resolve(doc))
            .catch(err => reject(err))
        })
    },

    // create (register) user
    createNewUser: (parent, args, context, info) => {
      
    }
  }
};

module.exports = root;
