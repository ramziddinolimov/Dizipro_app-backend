const { Op } = require("sequelize");
const { checkToken } = require("../modules/jsonwebtoken");

module.exports = async function AuthMiddleware(req, res, next) {
	try {
		const token = req.headers["authorization"];

		if (!token) throw new res.error(401, "Unauthorized");

		const data = checkToken(token);

		if (!data) throw new res.error(401, "Unauthorized");

		const session = await req.db.sessions.findOne({
			where: {
				session_id: data.session_id,
			},
			include: {
				model: req.db.users,
			},
			raw: true,
		});

		if (!session) throw new res.error(401, "Unauthorized");

		const bans = await req.db.user_bans.findOne({
			where: {
				ban_expire_date: {
					[Op.gt]: new Date(),
				},
				user_id: session.user_id,
			},
		});

		if (bans) {
			res.json({
				ok: true,
				message: "You are banned",
				data: {
					expire_date: session["user.user_bans.ban_expire_date"],
					reason: session["user.user_bans.ban_reason"],
				},
			});
			return;
		}

		req.session = session;
		req.role = data.role;

		next();
	} catch (error) {
		next(error);
	}
};