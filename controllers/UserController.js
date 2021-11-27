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

            const session = await req.db.sessions.create({
                session_user_agent: req.headers["user-agent"] || "Unknown",
                user_id: user.dataValues.user_id,
            });

            const token = createToken({
                session_id: session.dataValues.session_id,
                role: "user",
            });

            await res.status(201).json({
                ok: true,
                message: "User created successfully",
                data: {
                    token,
                },
            });
        } catch (error) {
            if (error.message.startsWith("notNull Violation")) {
                error.code = 400;
                error.message = "Country is invalid";
            } else if (error.message.includes("Validation error")) {
                error.code = 400;
                error.message = "Email already exists";
            }
            next(error);
        }
    }
}