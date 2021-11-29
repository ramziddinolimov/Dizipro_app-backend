module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("countries", {
		country_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		country_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		country_code: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});
};