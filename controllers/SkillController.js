const SkillValidations = require('../validations/SkillValidation')

module.exports = class SkillsController {
    static async AddSkillPostController(req, res, next){
        try {
            const  { skill_name } = await SkillValidations.SkillCreateValidation(
                req.body,
                res.error
            );

            const skill = await req.db.skills.create({
                skill_name,

            });

            res.status(201).json({
                ok: true,
                message: 'Skill created',
                data: { skill, },
            });
        } catch (error) {
            next(error);
        }
    }

    static async SkillsGetController(req, res, next) {
        try {
            const skills = await req.db.skills.findAll();

            res.json({
                ok: true,
                message: 'OK',
                data: { skills,},
            });
        } catch (error) {
            next(error);
        }
    }
}