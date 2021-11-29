module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("projects_softwares", {
		projects_software_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
		},
	});
};