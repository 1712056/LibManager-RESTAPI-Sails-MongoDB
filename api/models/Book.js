/**
 * Livre.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: "string",
    },
    numOfPages: {
      type: "number",
    },
    author: {
      type: "string",
    },
    isAvailable: {
      type: 'boolean',
      defaultsTo: true,
    },
  },
};
