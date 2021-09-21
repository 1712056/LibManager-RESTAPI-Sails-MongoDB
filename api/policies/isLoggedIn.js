/*eslint linebreak-style: ["error", "windows"]*/

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
  const accessToken = req.headers["x-access-token"];
  if (accessToken) {
    try {
      const decode =  jwt.verify(accessToken, "SECRET_KEY");
      req.accessTokenPayLoad = decode;
      next();
    } catch (e) {
      return HttpResponseService.json(res, 401, "Invalid access token");
    }
  } else {
    return HttpResponseService.json(res, 400, "Access token not found");
  }
};
