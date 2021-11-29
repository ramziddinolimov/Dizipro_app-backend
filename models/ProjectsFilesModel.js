module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("projects_files", {
		projects_file_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
		},
		projects_file_ext: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});
};