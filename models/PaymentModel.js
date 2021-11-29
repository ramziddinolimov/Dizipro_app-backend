/**
 * payment_id: UUID,
 * payment_status: "CREATED",
 * payment_project_id:
 * payment_bill_id:
 * payment_pay_url:
 */

 module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("payments", {
		payment_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			allowNull: false,
			primaryKey: true,
		},
		payment_status: {
			type: Sequelize.ENUM,
			values: [
				"REGISTERED",
				"PAID",
				"DECLINED",
				"ON_PROGRESS",
				"PAY_ERROR",
				"EXPIRED",
				"RETURNED",
			],
			defaultValue: "REGISTERED",
		},
		payment_bill_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		payment_pay_url: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});
};