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
  /**
   * 
   * @param {Object} req request object
   * @param {Object} res response
   * @returns all books in library
   */
  getAllBooks: async (req, res) => {
    const { status, data, error } = await BookService.getAllBooks();
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");
    }
    //return res.view("pages/books", { books: data });
    return HttpResponseService.json(res, 200, "Request success", data);

  },


  /**
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @returns a book in library
   */
  getSingleBook: async (req, res) => {
    const bookId = req.params.id;

    const { status, data, error } = await BookService.getSingleBook(bookId);
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");

      //return res.status(500).json({ message: "Database error" });
    }
    switch (status) {
      case 200:
        //return res.view("pages/singlebook", { book: data });
        return HttpResponseService.json(res, 200, "Request success", data);
      case 400:
        return HttpResponseService.json(res, 400, "Invalid book");
      //return res.status(204);
    }
  },


  /**
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @returns add new book into library
   */
  addBook: async (req, res) => {
    const book = req.body;
    const { status, data, error } = await BookService.addNewBook(book);
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");
      //return res.status(500).json({ message: "Database error" });
    }
    switch (status) {
      case 201:
        //return res.view("pages/singlebook", { book: data });
        return HttpResponseService.json(res, 201, "Create successfully", data);
      //return res.status(201).json({ book: data });
      case 400:
        return HttpResponseService.json(res, 400, "Invalid book");
      //return res.status(400).json({ message: "Invalid book" });
    }
  },


  /**
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @returns update a book in library
   */
  updateBook: async (req, res) => {
    const bookId = req.params.id;

    const { data } = await BookService.getSingleBook(bookId);

    if (data == null) {
      return HttpResponseService.json(res, 400, "Invalid book");

      //return res.status(400).json({ err: "Invalid book" });
    }
    const newData = req.body;
    const { error } = await BookService.updateBook(data, newData);
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");

      //return res.status(500).json({ err: error });
    }
    return HttpResponseService.json(
      res,
      200,
      `Book ${newData.title} is updated`
    );

    //return res
    // .status(200)
    // .json({ message: `Book ${newData.title} is updated` });
  },


  /**
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @returns delete a book in library
   */
  deleteBook: async (req, res) => {
    const bookId = req.params.id;
    const { status, message, error } = await BookService.deleteBook(bookId);
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");

      //return res.status(500).json({ message: "Database error" });
    }
    switch (status) {
      case 204:
        return HttpResponseService.json(res, 204);

      //return res.status(204).end();
      case 400:
        return HttpResponseService.json(res, 400, message);
      //return res.status(400).json({ message: message });
    }
  },
};
