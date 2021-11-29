module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("projects_skills", {
		projects_skill_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
		},
	});
};