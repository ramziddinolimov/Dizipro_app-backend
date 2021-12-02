module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("softwares", {
		software_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
		},
		software_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});
};