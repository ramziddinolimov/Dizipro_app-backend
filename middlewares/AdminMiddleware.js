module.exports = async function AdminMiddleware(req, res, next) {
	try {
		if (req.role !== "admin") {
			throw new res.error(401, "You don't have permission");
		}

		next();
	} catch (error) {
		next(error);
	}
};