const commonFun = {
  // Success response
  successResponse: (
    res,
    data = null,
    message = "Operation successful",
    code = 200
  ) => {
    return res.status(code).json({
      success: true,
      message,
      data,
      code,
    });
  },

  // Failure response
  failureResponse: (res, error = "Operation failed", code = 500) => {
    return res.status(code).json({
      success: false,
      message: error.message || error,
      code,
    });
  },
};

module.exports = commonFun;
