/* eslint-disable prefer-arrow-callback */
/*eslint linebreak-style: ["error", "windows"]*/
const nodemailer = require("nodemailer");

module.exports = {
  /**
   *
   * @returns all books in library
   */

  async getAllBooks() {
    try {
      const books = await Book.find();
      return {
        status: 200,
        data: books,
      };
    } catch (e) {
      return {
        status: 500,
        error: e,
      };
    }
  },

  /**
   *
   * @param {string} id
   * @returns a book
   */
  async getSingleBook(id) {
    try {
      const book = await Book.findOne({ _id: id }).populate("chapters");
      if (book) {
        return {
          status: 200,
          data: book,
        };
      }
      return {
        status: 400,
      };
    } catch (e) {
      return {
        status: 500,
        error: e,
      };
    }
  },

  /**
   *
   * @param {Object} singleBook info of a book
   * @returns a new book
   */
  async addNewBook(singleBook) {
    try {
      const { title, numOfPages, author, isAvailable, chapters } = singleBook;
      const book = await Book.create({
        title: title,
        numOfPages: numOfPages,
        author: author,
        isAvailable: isAvailable,
      }).fetch();
      for (let i = 0; i < chapters.length; i++) {
        await Chapter.create({
          number: i+1,
          title: chapters[i].title,
          page: chapters[i].page,
          book: book.id,
        }).fetch();
      }
      if (book) {
        return {
          status: 201,
          data: book,
        };
      }
      return {
        status: 400,
      };
    } catch (e) {
      return {
        status: 500,
        error: e,
      };
    }
  },

  /**
   *
   * @param {Object} unUpdateBook
   * @param {Object} newUpdateBook
   * @returns a updated book
   */
  async updateBook(unUpdateBook, newUpdateBook) {
    try {
      //muon sach
      if (unUpdateBook.isAvailable === true) {
        if (newUpdateBook.isAvailable === false) {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            //host: "smtp.ethereal.email",
            port: 1025,
            ignoreTLS: true,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "", // generated ethereal user
              pass: "", // generated ethereal password
            },
          });

          // send mail with defined transport object
          await transporter.sendMail({
            from: '"Library Contact" smtp.ethereal.email', // sender address
            to: "admin@malibrairie.com", // list of receivers
            subject: "Borrow book", // Subject line
            text: `You borrowed a book: ${newUpdateBook.title}`, // plain text body
          });
        }
      }
      const updatedBook = await Book.updateOne({ _id: unUpdateBook.id }).set({
        title: newUpdateBook.title,
        numOfPages: newUpdateBook.numOfPages,
        author: newUpdateBook.author,
        isAvailable: newUpdateBook.isAvailable,
      });

      return { updatedBook };
    } catch (error) {
      return error;
    }
  },

  /**
   *
   * @param {string} id
   * @returns
   */
  async deleteBook(id) {
    try {
      const destroyedBook = await Book.destroyOne({ _id: id });

      if (destroyedBook) {
        return {
          status: 204,
          message: "delete successfully",
        };
      }
      return {
        status: 400,
        message: "Invalid book",
      };
    } catch (e) {
      return {
        status: 500,
        error: e,
      };
    }
  },
};
