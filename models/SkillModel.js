module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("skills", {
		skill_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
		},
		skill_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});
};