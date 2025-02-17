class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.success = false;
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    console.error(`[ERROR]: ${message}`);
    
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  };
  
  module.exports = { ApiError, errorHandler };
  