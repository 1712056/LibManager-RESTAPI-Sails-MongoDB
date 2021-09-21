/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable semi */
/* eslint-disable eqeqeq */
/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require("bcryptjs");

module.exports = {
  /**
   *
   * @param {Object} req request object
   * @param {Object} res response
   * @returns create successfully a new user or fail
   */
  signUp: async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    const { status, newUser, error } = await UserService.addUser(user);
    delete user.password;
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");
    }
    switch (status) {
      case 201:
        return HttpResponseService.json(
          res,
          201,
          "Create successfully",
          newUser
        );
      case 400:
        return HttpResponseService.json(res, 400, "Invalid User");
    }
  },
};
