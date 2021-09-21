/* eslint-disable linebreak-style */
/**
 * Chapter.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    number: { type: "number" },
    title: {
      type: "string",
    },
    page: {
      type: "number",
    },
    book: {
      model: "book",
    },
  },
};
