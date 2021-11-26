const  { generateCrypt, compareCrypt } = require('../modules/bcrypt');
const sendEmail = require("../modules/email");
const { createToken } = require('../modules/jsonwebtoken');
const UserValidations = require("../validations/UserValidations");
const generator = require("generate-password");