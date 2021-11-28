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

    static async UserLoginAccountPostController(req, res, next){
        try {
            const data = await UserValidations.UserLoginAccountValidation(
                req.body,
                res.error
            );

            const user = await req.db.users.findOne({
                where: {
                    user_email: data.user_email,
                },
                raw: true,
            });

            if (!user) throw new res.error(404, "User not found");

            const isTrust = compareCrypt(
                data.user_password,
                user.user_password
            );

            if (!isTrust) throw new res.error(400, "Password is incorrect");

            await req.db.sessions.destroy({
                where: {
                    session_user_agent: req.headers["user-agent"] || "Unknown",
                    user_id: user.user_id,
                },
            });

            const session = await req.db.sessions.create({
                session_user_agent: req.headers["user-agent"] || "Unknown",
                user_id: user.user_id
            });

            const token = createToken({
                session_id: session.dataValues.session_id,
                role: user.user_role || "user",
            });

            await req.db.attempts.destroy({
                where: {
                    user_id: user.user_id,
                },
            });

            res.status(201).json({
                ok: true,
                message: "Logged successfully",
                data: {
                    token,
                }
            })
        } catch (error) {
            next(error);
        }
    }

    static async UserRecoveryPasswordSubmitPostController(req, res, next) {
        try {
            const data = await UserValidations.UserForgotPasswordValidation(
                req.body,
                res.error
            );

            const user = await req.db.users.findOne({
                where: {
                    user_email: data.user_email,
                },
            });

            if (!user) throw new res.error(404, "Invalid email");

            const count = await req.db.attempts.count({
                where: {
                    user_email: data.user_email,
                },
            });

            if (!user) throw new res.error(404, "Invalid email");

            const count = await req.db.attempts.count({
                where: {
                    user_id: user.dataValues.user_id,
                },
            });

            if (count > 5) {
                throw new res.error(429, "Too many requests");
            }

            const attempts = await req.db.attempts.create({
                user_id: user.dataValues.user_id,
            });

            await sendEmail(
                user.dataValues.user_email,
                `<a href="${process.env.SITE_URL}/v1/users/password/${attempt.dataValues.attempt_id}">Click to recover</a>`
            );

            res.status(201).json({
                ok: true,
                massage: "Confirmation message sent. Check your email."
            });
        } catch (error) {
            next (error);
        }
    }
}