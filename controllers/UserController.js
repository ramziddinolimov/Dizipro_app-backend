const  { generateCrypt, compareCrypt } = require('../modules/bcrypt');
const sendEmail = require("../modules/email");
const { createToken } = require('../modules/jsonwebtoken');
const UserValidations = require("../validations/UserValidations");
const generator = require("generate-password");

module.exports = class UserController {
    static async UserCreateAccountPostController(req, res, next){
        try {
            const data = await UserValidations.UserCreateAccountValidation(
                req.body,
                res.error
            );

            const user = await req.db.users.create({
                ...data,
                user_password: generateCrypt(data.user_password),
            });

            
        } catch (error) {
            next(error);
        }
    }
}