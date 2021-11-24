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

            //REGISTERED

            if (
                project.dataValues.payments.find(
                    (payment) => payment.dataValues.payment_status == "PAID"
                )
            )
            throw new res.error(400, "You have already paid ");

            if(
                project.dataValues.payments.find(
                    (payment) =>
                    payment.dataValues.payment_status == "REGISTERED"
                )
            )

            throw new res.error(400, "You have already have payment bill");
            const payment = await req.db.payments.create(
                {
                    project_id: project_id,
                },
                {
                    transaction: tr,
                }
            );

            const new_payment = await req.payments.oson.createInvoice(
                payment.dataValues.payment_id,
                project.dataValues.project_budget,
                project.dataValues.project_currency,
                req.session["user.user_email"],
                "Payment for project " + project.dataValues.project_id,
                req.body?.return_url,
                60,
                "en"
            );
        } catch (error) {
            next(error);
        }
    }
}