const jwt = require("jsonwebtoken");
// set secret token and expiration date
const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ email, nickname, _id }) {
    const payload = { email, nickname, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
