/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable semi */
/* eslint-disable eqeqeq */
/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomStr = require("randomstring");
module.exports = {
  /**
   *
   * @param {Object} req request object
   * @param {Object} res response
   * @returns isAuthenticated
   */
  signIn: async (req, res) => {
    const { status, user, error } = await UserService.getUser(
      req.body.username
    );
    if (error) {
      return HttpResponseService.json(res, status, "Database error", {
        authenticated: false,
      });
    }
    if (user === null) {
      return HttpResponseService.json(
        res,
        401,
        "Invalid username or password",
        { authenticated: false }
      );
      //return res.json({ authenticated: false });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return HttpResponseService.json(
        res,
        401,
        "Invalid username or password",
        { authenticated: false }
      );
      //return res.json({ authenticated: false });
    }
    const opts = {
      expiresIn: 60 * 10,
    };
    const payload = {
      userId: user.id,
    };
    const accessToken = jwt.sign(payload, "SECRET_KEY", opts);
    const refreshToken = randomStr.generate(80);
    await UserService.patchRFToken(user.id, refreshToken);
    return HttpResponseService.json(res, 200, "Login success", {
      authenticated: true,
      accessToken,
      refreshToken,
    });
  },

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @return a new access token
   */
  getNewACToken: async (req, res) => {
    const { accessToken, refreshToken } = req.body;
    const user = jwt.verify(accessToken, "SECRET_KEY", {
      ignoreExpiration: true,
    });
    const ret = await UserService.isRFToken(user.id, refreshToken);
    if (ret === true) {
      const opts = {
        expiresIn: 60 * 10,
      };
      const payload = {
        userId: user.id,
      };
      const accessToken = jwt.sign(payload, "SECRET_KEY", opts);
      return HttpResponseService.json(
        res,
        200,
        "accesstoken is reset",
        {accessToken}
      );
    }
    return HttpResponseService.json(res, 400, "Refresh token is revoked");
  },
};
