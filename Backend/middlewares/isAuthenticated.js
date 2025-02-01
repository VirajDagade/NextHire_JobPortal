import jwt from "jsonwebtoken";

// Middlewares in Express.js are functions that process requests and responses. They run between receiving a request and sending a response, handling tasks like authentication, logging, or modifying request/response data.

const isAuthenticated = async (req, res, next) => {
  try {
    // console.log("Cookies received:", req.cookies);
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not Authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    // The jwt.verify() function in the jsonwebtoken library is used to verify the authenticity of a JSON Web Token (JWT). It checks if the token is valid and was signed with the correct secret or public key.
    // console.log("Decoded Token:", decode);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
    // The next function in Express.js is used in middleware to pass control to the next middleware function in the stack. If not called, the request will be left hanging.
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Authentication Failed",
      success: false,
    });
  }
};

export default isAuthenticated;
