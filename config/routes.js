/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
// const validateMiddleware = require('./../api/policies/Validator');
// const validateBook = require('./../api/helpers/BookService');

module.exports.routes = {

  //routes about books
  '/': { view: 'pages/homepage' },
  'GET /books':{action:'Livre/getAllBooks'},
  'GET /books/:id':{action:'Livre/getSingleBook'},
  'POST /books':{action:'Livre/addBook'},
  'PUT /books/:id':{action:'Livre/updateBook'},
  'DELETE /books/:id':{action:'Livre/deleteBook'},

  //routes about authentication
  'POST /users':{action:'User/signUp'},
  'POST /auth':{action:'Auth/signIn'},
  'POST /auth/actoken':{action:'Auth/getNewACToken'},

  //routes about chapter
  'GET /books/:id/chapters':{action:'Chapter/getAllChapters'},
  'GET /books/:id/chapters/:number':{action:'Chapter/getChapter'},
  'POST /books/:id/chapters':{action:'Chapter/addChapter'},
  'PUT /books/:id/chapters/:number':{action:'Chapter/updateChapter'},
  'DELETE /books/:id/chapters/:number':{action:'Chapter/deleteChapter'},


};
