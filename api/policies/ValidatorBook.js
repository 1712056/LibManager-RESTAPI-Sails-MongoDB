/*eslint linebreak-style: ["error", "windows"]*/
const Joi = require("joi");

const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    numOfPages: Joi.number().min(1).required(),
    author: Joi.string().min(1).required(),
    isAvailable: Joi.boolean().required(),
    chapters: Joi.array(),
  });
  return schema.validate(book);
};
module.exports = function Validator(req, res, next) {
  const { error } =  validateBook(req.body);
  if (error) { 
    //HttpResponseService.json(res, 400, error.details[0].message) 
    return res.status(400).send(error.details[0].message);
  }
  next();
};
