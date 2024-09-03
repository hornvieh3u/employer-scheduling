const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

module.exports = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }

  // eslint-disable-next-line no-console
  console.log(mappedErrors);
});
