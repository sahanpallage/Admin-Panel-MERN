import jwt from "jsonwebtoken";

const secret = "2F7A68D3CAF4CEEF23A2837B7D672";

export default function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
