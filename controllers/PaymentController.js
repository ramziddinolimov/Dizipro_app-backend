module.exports = class PaymentController {
    static async PaymentCreatePostController(req, res, next) {
        const tr = await req.db.sequelize.transaction();

        try {
            const project_id = req.params?.project_id;
            if(!project_id) throw new res.error(404, "Project not found");
            const project = await req.db.projects.findOne({
                where: {
                    project_id,
                },
                include: [
                    {
                        model: req.db.users,
                        as: 'user',
                    },
                    {
                        model: req.db.payments,
                        as: 'payments',
                    },
                ],
            });

            if (!project) throw new res.error(404, "Project not found")

            if (project.dataValues.user_id !== req.session.user_id)
            throw new res.error(404, "You can't pay for this project")
        } catch (error) {
            next(error);
        }
    }
}