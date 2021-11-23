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
}