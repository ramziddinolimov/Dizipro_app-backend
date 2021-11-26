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

            res.status(201).json({
                ok: true,
                message: 'Software created',
                data: {software,},
            });
        } catch (error) {
            next(error);
        }
    }

    static async SoftwaresGetController(req, res, next){
        try {
            const softwares = await req.db.softwares.findAll();

            res.json({
                ok: true,
                message: "OK",
                data: {
                    softwares,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}