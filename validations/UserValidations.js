const Joi = require("joi");

module.exports = class UserValidations {
	static async UserCreateAccountValidation(data, CustomError) {
		return await Joi.object({
			user_name: Joi.string()
				.min(2)
				.max(64)
				.required()
				.error(new CustomError(400, "Name is invalid")),
			user_email: Joi.string()
				.email()
				.required()
				.lowercase()
				.error(new CustomError(400, "Email is invalid")),
			user_gender: Joi.string()
				.valid("male", "female")
				.required()
				.error(new CustomError(400, "Gender is invalid")),
			user_password: Joi.string()
				.required()
				.min(4)
				.error(new CustomError(400, "Password is invalid")),
			country_id: Joi.number()
				.required()
				.error(new CustomError(400, "Country id is invalid")),
		}).validateAsync(data);
	}

    static async UserLoginAccountValidation(data, CustomError) {
		return await Joi.object({
			user_email: Joi.string()
				.email()
				.required()
				.lowercase()
				.error(new CustomError(400, "Email is invalid")),

			user_password: Joi.string()
				.required()
				.min(4)
				.error(new CustomError(400, "Password is invalid")),
		}).validateAsync(data);
	}

	static async UserForgotPasswordValidation(data, CustomError) {
		return await Joi.object({
			user_email: Joi.string()
				.email()
				.required()
				.lowercase()
				.error(new CustomError(400, "Email is invalid")),
		}).validateAsync(data);
	}
};