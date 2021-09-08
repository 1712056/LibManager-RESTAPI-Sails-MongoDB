/* eslint-disable prefer-arrow-callback */
/*eslint linebreak-style: ["error", "windows"]*/
const nodemailer = require("nodemailer");

module.exports = {
  getAllBooks: async function () {
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
  getSingleBook: async function (id) {
    try {
      const book = await Book.findOne({ _id: id });
      if (book) {
        return {
          status: 200,
          data: book,
        };
      }
      return {
        status: 204,
      };
    } catch (e) {
      return {
        status: 500,
        error: e,
      };
    }
  },
  addNewBook: async function (singleBook) {
    try {
      const { title, numOfPages, author, isAvailable } = singleBook;
      const book = await Book.create({
        title: title,
        numOfPages: numOfPages,
        author: author,
        isAvailable: isAvailable,
      }).fetch();

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
  updateBook: async function (singleBook) {
    try {
      const { id, title, isAvailable } = singleBook;
      if (isAvailable === true) {
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
          text: `You borrowed a book: ${title}`, // plain text body
        });
      }
      const updatedBook = await Book.updateOne({ _id: id }).set({
        isAvailable: !isAvailable,
      });
      return { updatedBook };
    } catch (error) {
      return error;
    }
  },
  deleteBook: async function (id) {
    try {
      const destroyedBook = await Book.destroyOne({ _id: id });

      if (destroyedBook) {
        return {
          status: 200,
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
