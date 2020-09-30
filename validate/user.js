const { validationResult, check } = require("express-validator");

const userSignUpValidator = () => {
  return [
    check("firstname", "First name is required!").notEmpty(),

    check("lastname", "Last name is required!").notEmpty(),

    check("email", "Email is required")
      .notEmpty()
      .withMessage("Please Enter your Email")
      .isEmail()
      .withMessage("Please Enter a valid Email Address"),

    check("password", "Password is required").notEmpty(),

    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must contain at least 6 characters"),
  ];
};
const userSigninValidator = () => {
  return [
    check("email", "email is required")
      .notEmpty()
      .withMessage("Please Enter your username"),
    check("password", "Password is required")
      .notEmpty()
      .withMessage("Please Enter Password"),
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
  userSignUpValidator,
  userSigninValidator,
  validate,
};
