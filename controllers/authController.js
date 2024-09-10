// Import schema and keep it in a container called User
const User = require("../models/user");

// Import the bcrypt(external) and keep it in a container called bcrypt
const bcrypt = require("bcryptjs");

// Import the jsonwebtoken(external) and keep it in a container called jwt
// const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const customError = require("../utils/customError"); // Imported from Utils when declaring the customError on ERROR HANDLING BELOW

//===================== CONTROLLER FOR SIGN-UP / REGISTER A NEW USER ==============
const register = async (req, res, next) => {
  console.log(req.body);

  const { email, password, repeatPassword } = req.body; //Deconstructing all to enter req.body

  //   CHECKING FOR ERROR BTW REQ AN RES (ERROR HANDLING)
  if (!email) {
    // return res.status(400).json({ message: "Please provide an email address" });
    return next(customError("Please provide an email address", 400));
  }

  if (!password) {
    // return res.status(400).json({ message: "Please Provide a Password" });
    return next(customError("Please provide a password", 400));
  }

  if (password !== repeatPassword) {
    // return res.status(400).json({ message: "Password does not match" });
    return next(customError("Password does not match", 400));
  }

  // ==============BCRYPT FOR HARSHING AND UNHARSHING PASSWORD
  // ==== setting the level of harness to level 10
  const salt = await bcrypt.genSalt(10);
  //====== PROPER HASHING
  const hashedPassword = await bcrypt.hash(password, salt);

  //========== TRY AND CATCH ===============
  try {
    const user = await User.create({ email, password: hashedPassword });
    return res.status(201).json({ message: "User Created" });
  } catch (error) {
    // return res.status(500).json({ message: error });

    if (error.code === 11000 && error.keyValue.email) {
      console.log(error.code);
      console.log(error.keyValue.email);

      return next(customError("Email Already Exist", 401));
    }

    // INCASE IT IS NOT A DUPLICATE ERROR BUT A MESSAGE ERROR
    if (error.errors.email.message) {
      return next(customError(error.errors.email.message, 400));
    }

    // INCASE THE ERROR IS FROM SOMEWHERE IN THE BACKEND
    next(customError("Something went wrong", 500));
  }
};

// =================== CONTROLLER TO LOG-IN AN EXISTING USER ==================

const login = async (req, res, next) => {
  const { email, password } = req.body; //Destructuring the email and password

  if (!email) {
    return next(customError("Please provide an email address", 400));
  }

  if (!password) {
    return next(customError("Please provide a password", 400));
  }

  const user = await User.findOne({ email }); // Using the User(schema imported up), findOne

  // IN THE CASE WHERE AN EMAIL IS TRYING TO LOGIN THAT HAS NOT REGISTERED BEFORE
  if (!user) {
    return next(customError("User does not exist", 401));
  }

  // COMPARING PASSWORD FROM REGISTER TO LOGIN , THAT IS ALSO BCRYPTED
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    // If password do not match, after comparing
    return next(customError("Wrong Password", 400));
  }

  //Generate a token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.status(200).json({ message: "Login Successfully", token });
};

// ==================================================
//  DO A CONTROLLER TO getUser BASED ON VALID TOKEN
const getUser = (req, res, next) => {
  const { userId } = req.user;
  res.status(200).json({ id: userId });
};

module.exports = { register, login, getUser };
