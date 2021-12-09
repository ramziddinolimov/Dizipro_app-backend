const Joi = require("joi");

module.exports = class ProjectValidations {
	static async ProjectCreateValidation(data, CustomError) {
		return await Joi.object({
			project_name: Joi.string()
				.min(2)
				.max(64)
				.required()
				.error(new CustomError(400, "Name is invalid")),
			project_description: Joi.string()
				.min(10)
				.max(4096)
				.required()
				.error(new CustomError(400, "Description is invalid")),
			project_skills: Joi.array()
				.required()
				.error(new CustomError(400, "Skills is invalid")),
			project_softwares: Joi.array()
				.required()
				.error(new CustomError(400, "Softwares is invalid")),
			project_budget: Joi.number()
				.required()
				.min(1)
				.error(new CustomError(400, "Budget is invalid")),
			project_currency: Joi.string()
				.valid("USD", "EUR", "RUB", "UZS")
				.required()
				.error(new CustomError(400, "Currency is invalid")),
			project_deadline: Joi.date()
				.min(new Date())
				.error(new CustomError(400, "Deadline is invalid")),
		}).validateAsync(data);
	}
};