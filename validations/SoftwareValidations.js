const Joi = require("joi");

module.exports = class SoftwareValidations {
	static async SoftwareCreateValidation(data, CustomError) {
		return await Joi.object({
			software_name: Joi.string()
				.min(2)
				.max(64)
				.required()
				.error(new CustomError(400, "Name is invalid")),
		}).validateAsync(data);
	}
};