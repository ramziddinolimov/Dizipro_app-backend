module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("projects", {
		project_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
		},
		project_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		project_description: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		project_deadline_date: {
			type: Sequelize.DATE,
			allowNull: true,
			min: new Date(),
		},
		project_budget: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		project_currency: {
			type: Sequelize.ENUM,
			values: ["USD", "EUR", "RUB", "UZS"],
			allowNull: false,
		},
		project_status: {
			type: Sequelize.ENUM,
			values: ["waiting", "inprogress", "finished"],
			defaultValue: "waiting",
			allowNull: false,
		},
	});
};