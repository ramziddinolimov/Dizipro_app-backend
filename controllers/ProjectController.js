const ProjectValidations = require("../validations/ProjectValidations")
const path = require("path");

module.exports = class ProjectController {
    static async CreateProjectPostController(req, res, next) {
        const t = await req.db.sequelize.transaction();
        try {
            
        } catch (error) {
            next(error);
        }
    }
}