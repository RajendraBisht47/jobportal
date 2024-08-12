import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "User is not logged in", success: false });
    }
    const decode = await jwt.verify(token, process.env.KEY);
    if (!decode) {
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
    req.id = await decode.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authentication;
