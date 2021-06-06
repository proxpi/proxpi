function ErrorHandler(err, req, res, next) {
  if (err.name == "UnauthorizedError") {
    res.status(401).send({
      status: "Error",
      message: "This route is protected. Please go to https://proxpi.tech/",
    });
  } else {
    next();
  }
}
module.exports = ErrorHandler;
