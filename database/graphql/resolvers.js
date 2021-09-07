const Authors = require("../models");

const root = {
  Query: {
    getAuthors: (_, args, __, ___) =>
      new Promise((resolve, reject) => {
          const limit = args.limit || null
          console.log(limit);
        Authors.find().limit(limit).sort("desc")
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
  },
};

module.exports = root;
