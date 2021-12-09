const Joi = require("joi");

module.exports = class SkillValidations {
	static async SkillCreateValidation(data, CustomError) {
		return await Joi.object({
			skill_name: Joi.string()
				.min(2)
				.max(64)
				.required()
				.error(new CustomError(400, "Name is invalid")),
		}).validateAsync(data);
	}
};