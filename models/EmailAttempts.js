module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("email_attempts", {
		attempt_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
		},
	});
};