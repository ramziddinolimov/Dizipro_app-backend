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

            for (let skill of data.project_skills){
                await req.db.project_skills.create(
                    {
                        project_id: project.dataValues.project_id,
                        skill_id: skill,
                    },
                    { transaction: t }
                );
            }

            for (let software of data.project_softwares){
                await req.db.projects_softwares.create(
                    {
                        project_id: project.dataValues.project_id,
                        software_id: software,
                    },
                    { transaction: t }
                );
            }

            const allowedTypeForFile = [
                ".zip",
                ".rar",
                ".obj",
                ".png",
                ".jpg",
                ".jpeg",
                ".fbx",
                ".stl",
            ];

            let files = req.files?.files;

            if (!Array.isArray(files) && files) {
                files = [req.files?.files];
            }

            if(!files) throw new res.error(400, "Files not found");
            if (files?.length > 6) throw new res.error(400, "Files too many");

            files.map((file) => {
                if (
                    !allowedTypeForFile.includes(getExtension(file.name)) ||
                    file.size > 100 * 1024000
                ) {
                    throw new res.error(400, "Not allowed file type" + getExtension(file.name));
                }
            });

            for (let file of files) {
                const f = await req.db.projects_files.create(
                    {
                        projects_file_ext: getExtension(file.name),
                        project_id: project.dataValues.project_id,
                    },
                    { transaction: t }
                );

                await file.mv(
                    path.join(
                        __dirname,
                        "..",
                        "public",
                        "files",
                        f.dataValues.projects_file_id + getExtension(file.name)
                    )
                );
            }

            await t.commit();

            res.status(201).json({
                ok: true,
                message: "Project created",
                data: {
                    project,
                },
            });
        } catch (error) {
            await t.rollback();
            next(error);
        }
    }
}