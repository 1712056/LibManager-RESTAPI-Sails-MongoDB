/*eslint linebreak-style: ["error", "windows"]*/
const Joi = require("joi");

const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    numOfPages: Joi.number().min(1).required(),
    author: Joi.string().min(1).required(),
    
  });
  return schema.validateAsync(book);
};
module.exports = async function Validator(req, res, next) {
  
  const { error } = await validateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};
