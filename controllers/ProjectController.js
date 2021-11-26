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
            );

            const project = await req.db.projects.create(
                {
                    ...data,
                    user_id: req.session.user_id,
                },
                { transaction: t }
            );
        } catch (error) {
            next(error);
        }
    }
}