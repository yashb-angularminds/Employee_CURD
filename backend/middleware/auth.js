const jwt = require("jsonwebtoken");
const { ApiError } = require("../middleware/error");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};

module.exports = authMiddleware;
