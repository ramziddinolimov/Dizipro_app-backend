const Joi = require("joi");

module.exports = class AdminValidations {
	static async CreateBanValidation(data, CustomError) {
		return await Joi.object({
			user_id: Joi.string()
				.required()
				.uuid()
				.error(new CustomError(400, "User id is invalid")),
			ban_reason: Joi.string()
				.required()
				.min(10)
				.max(1024)
				.error(new CustomError(400, "Reason is invalid")),
			ban_expire_date: Joi.date()
				.required()
				.min(new Date())
				.error(new CustomError(400, "Expire date is invalid")),
		}).validateAsync(data);
	}
};