/* eslint-disable indent */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable semi */
/* eslint-disable eqeqeq */
/**
 * LivreController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAllBooks: async function (req, res) {
    const { status, data, error } = await BookService.getAllBooks();
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }
    switch (status) {
      case 200:
        return res.view("pages/books", { books: data });
      default:
        return res.status(status).end();
    }
  },
  getSingleBook: async function (req, res) {
    const bookId = req.params.id;

    const { status, data, error } = await BookService.getSingleBook(bookId);
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }
    switch (status) {
      case 200:
        return res.view("pages/singlebook", { book: data });
      case 204:
        return res.status(204).json({ m: "Invalid book" });
    }
  },
  addBook: async function (req, res) {
    const book = req.body;
    const { status, data, error } = await BookService.addNewBook(book);
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }
    switch (status) {
      case 201:
        return res.view("pages/singlebook", { book: data });

        //return res.status(201).json({ book: data });
      case 400:
        return res.status(400).json({ message: "Invalid book" });
    }
  },
  updateBook: async function (req, res) {
    const bookId = req.params.id;
    
    const { data } = await BookService.getSingleBook(bookId);

    if (data == null) {
      return res.status(400).json({ err: "Invalid book" });
    }
    const { error } = await BookService.updateBook(data);
    if (error) {
      return res.status(500).json({ err: error });
    }
    return res.status(200).json({ message: `Book ${data.title} is updated` });
  },
  deleteBook: async function (req, res) {
    const bookId = req.params.id;
    const { status, message, error } = await BookService.deleteBook(bookId);
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }
    switch (status) {
      case 200:
        return res.status(200).json({ message: message });
      case 400:
        return res.status(400).json({ message: message });
    }
  },
};
