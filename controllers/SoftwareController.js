const SoftwareValidations = require("../validations/SoftwareValidations");
module.exports = class SoftwaresController {
    static async AddSoftwarePostController(req, res, next) {
        try {
            const { software_name } =
            await SoftwareValidations.SoftwareCreateValidation(
                req.body,
                res.error
            );

            const software = await req.db.softwares.create({
                software_name,
            });
        } catch (error) {
            next(error);
        }
    }
}