const Authors = require("../models/authorSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, storeFS } = require("../../helpers");

require("dotenv").config();

const root = {
  Query: {
    // get all authors
    getAuthors: (_, args, context, ___) => {
      return new Promise((resolve, reject) => {
        const limit = args.limit || null;
        const order = args.order === "DESC" ? -1 : 1;
        Authors.find()
          .limit(limit)
          .sort({ date_created: order })
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
      });
    },
    // get a author
    getAuthor: (_, args, __, ___) => {
      return new Promise((resolve, reject) => {
        Authors.findById(args.id)
          .then((doc) => {
            resolve(doc);
          })
          .catch((err) => reject(err));
      });
    },
    getBooks: (parent, args, context, info) => {
      return new Promise((resolve, reject) => {
        // sort and favour rising authors and best_sellers
        Authors.find({ "status": {$in : ["RISING", "BEST_SELLER"] }}, { books: 1 }).sort({ "date_created": 1 })
            .then(doc => {
              return resolve(doc[0].books)
            })
            .catch(err => reject(err))
      })
      

    },
    getBookDetails: (parent, args, context, info) => {
      var bookId = args.id
      return new Promise((resolve, reject) => {
        Authors.find({ "books._id": { $eq: bookId } }, { books: 1 })
              .then(doc => {
                const foundBook = doc[0].books.filter(book => book.id === bookId)
                resolve(foundBook[0])
              })
              .catch(err => reject(err))
      })
    },
  },
  Mutation: {
    // delete an author
    deleteAuthor: (_, args, context, ___) => {
      verifyToken(context.headerAuth); // authenticate and authorize token
      return new Promise((resolve, reject) => {
        Authors.findByIdAndDelete(args.id)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
      });
    },
    // create an author
    createNewAuthor: async (_, args, context, ___) => {
      verifyToken(context.headerAuth); // authenticate and authorize token
      const newDoc = {
        name: args.input.name,
        status: args.input.status,
        user_id: args.userId,
        books: await storeFS(args.input.books, args.file), // save image in books object
        author_bio: args.input.author_bio,
      };
      return new Promise((resolve, reject) => {
        // check if user_id exists before saving
        Authors.find({ user_id: args.userId }, (err, doc) => {
          if (err) return reject(err);
          if (!doc.length)
            return reject(new Error("This user id does not exists"));
        });
        new Authors(newDoc)
          .save()
          .then((doc) => resolve(doc))
          .catch((err) => reject(err));
      });
    },
    // update an author
    updateAuthor: (_, args, context, ___) => {
      verifyToken(context.headerAuth); // authenticate and authorize token
      const updatedAuthor = {
        name: args.input.name,
        author_bio: args.input.author_bio,
      };
      return new Promise((resolve, reject) => {
        Authors.findByIdAndUpdate(args.id, updatedAuthor)
          .then((doc) => resolve(doc))
          .catch((err) => reject(err));
      });
    },

    // Update Book list for Author
    updateBookList: async (_, args, context, ___) => {
      verifyToken(context.headerAuth); // authenticate and authorize token

      // compile books object, first
      var bookObj = await storeFS(args.input, args.file);

      return new Promise((resolve, reject) => {
        // Look for author
        Authors.findById(args.author_id)
          .then((doc) => {
            if (!doc) return reject(new Error("No Author with that id exists"));
            // Author exists, push to books []

            Authors.updateOne(
              { _id: doc._id },
              {
                $push: {
                  books: bookObj,
                },
              }
            )
              .then((res) => {
                resolve("Updated: Success");
              })
              .catch((err) => reject(new Error(err)));
          })
          .catch((err) => reject(err));
      });
    },

    createNewUser: (_, args, __, ___) => {
      const input = args.input;
      return new Promise((resolve, reject) => {
        if (
          !input.firstName ||
          !input.lastName ||
          !input.email ||
          !input.password
        ) {
          return reject(new Error("One or more fields are empty"));
        }
        // check if user exists
        User.find({ email: input.email }, (err, doc) => {
          if (err) throw err;
          if (doc.length)
            return reject(
              new Error("A user with that email address already exists!")
            );
        });
        // hash password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(input.password, salt, (err, hashedPass) => {
            // save new object to DB
            if (err) throw err;
            const newObj = Object.assign({}, input, { password: hashedPass });
            new User(newObj)
              .save()
              .then((user) => {
                // generate JWT
                let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                  expiresIn: "1h",
                });
                const response = {
                  id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  phoneNo: user.phoneNo,
                  user_category: user.user_category,
                  profile_pic: user.profile_pic,
                  date_created: user.date_created,
                  token: token,
                };
                return resolve(response);
              })
              .catch((err) => reject(err));
          });
        });
      });
    },
    login: (parent, args, context, info) => {
      return new Promise((resolve, reject) => {
        // simple validation
        if (!args.email || !args.password)
          return reject("All fields are required!");

        User.findOne({ email: args.email }, (err, doc) => {
          if (err) throw err;
          if (!doc)
            return reject(new Error("Email or password is incorrect!"));

          // user found, compare password
          bcrypt.compare(args.password, doc.password, (err, res) => {
            if (err) throw err;
            if (!res) return reject(new Error("Email or password is incorrect!"));

            // generate JWT
            let token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET, {
              expiresIn: "1h",
            });
            const response = {
              id: doc._id,
              firstName: doc.firstName,
              lastName: doc.lastName,
              email: doc.email,
              phoneNo: doc.phoneNo,
              user_category: doc.user_category,
              profile_pic: doc.profile_pic,
              date_created: doc.date_created,
              token: token,
            };
            return resolve(response);
          });
        });
      });
    },
  },
};

module.exports = root;
