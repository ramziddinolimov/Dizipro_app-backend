const AdminValidations = require("../validations/AdminValidations");

module.exports = class AdminController {
    static async CreateBanPostController(req, res, next) {
        try {
            const data = await AdminValidations.CreateBanValidation(
                req.body,
                res.error
            );

            const user = await req.db.users.findOne({
                where: {
                    user_id: data.user_id,
                },
            });

            if (!user) throw new res.error(404, "User not found");

            if (user.role == "admin")
                throw new res.error(404, "You can't ban admins");

                const ban = await req.db.user_bans.create({
                    user_id: data.user_id,
                    ban_reason: data.ban_expire_date,
                });

                res.status(201).json({
                    ok: true,
                    message: "Ban created",
                    data: {
                        ban,
                    },
                });
        } catch (error) {
            next(error);
        }
    }

    static async DeleteBanController(req, res, next) {
        try {
            const ban_id = req.params.ban_id;

            const ban = await req.db.user_bans.destroy({
                where: {
                    ban_id: ban_id,
                },
            });

            res.status(200).json({
                ok: true,
                message: "Ban removed",
            });
        } catch (error) {
            next(error);
        }
    }

    static async GetAllUsersController(req, res, next) {
        try {
            const limit = req.query.limit || 15;
            const offset = req.query.offset - 1 || 0;

            const users = await req.db.users.findAll({
                offset,
                limit,
                include: [req.db.user_bans, req.db.sessions],
                attributes: {
                    exclude: ["user_password"],
                },
            });

            res.status(200).json({
                ok: true,
                message: "OK",
                data: {
                    users,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}