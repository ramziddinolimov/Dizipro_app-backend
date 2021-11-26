const ProjectValidations = require("../validations/ProjectValidations")
const path = require("path");

module.exports = class ProjectController {
    static async CreateProjectPostController(req, res, next) {
        const t = await req.db.sequelize.transaction();
        try {
            if (!(req.body?.project_skills && req.body?.project_softwares)){
                throw new res.error(400, "Bad Request");
            }
            const data = await ProjectValidations.ProjectCreateValidation(
                {
                    ...req.body,
                    project_skills: JSON.parse(req.body.project_skills),
                    project_softwares: JSON.parse(req.body.project_softwares),
                },
                res.error
            )
        } catch (error) {
            next(error);
        }
    }
}