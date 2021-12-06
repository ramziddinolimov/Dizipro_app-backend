const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AdminMiddleware = require("../middlewares/AdminMiddleware");
const SkillController = require("../controllers/SkillController");

const SkillRouter = require("express").Router();

SkillRouter.use(AuthMiddleware);

SkillRouter.post("/", AdminMiddleware, SkillController.AddSkillPostController);
SkillRouter.get("/", SkillController.SkillsGetController);

module.exports = SkillRouter;