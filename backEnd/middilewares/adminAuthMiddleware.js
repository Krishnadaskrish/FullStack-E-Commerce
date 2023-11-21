const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
module.exports = function verifyToken(req, res, next) {
  const Btoken = req.headers["authorization"];

  // Check if authorization header is present
  if (!Btoken) {
    return res.status(403).json({ error: "No token provided" });
  }

  // Split the token if it exists
  const token = Btoken.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(403).json({ error: "Malformed token" });
  }

  jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.username = decoded.username;
    next();
  });
};
