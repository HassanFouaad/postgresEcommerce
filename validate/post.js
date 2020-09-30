const { validationResult, check } = require("express-validator");

const postValidator = () => {
  return [
    check("text", "Post text is required!").notEmpty(),
  ];
};
const validate = (req, res, next) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    return res.status(400).json({ error: result.array()[0] });
  }
  return next();
};
module.exports = {
    postValidator,
  validate,
};
