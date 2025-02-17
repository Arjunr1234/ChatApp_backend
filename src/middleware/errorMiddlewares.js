import { HttpStatusCode } from "../utils/statusCodes.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Error Middleware:", err);

  
  const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
