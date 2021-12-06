const ProjectRouter = require("express").Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AdminMiddleware = require("../middlewares/AdminMiddleware");
const ProjectsController = require("../controllers/ProjectController");

const fileUpload = require("express-fileupload");
const configFileUpload = {
	safeFileNames: false,
};

ProjectRouter.use(AuthMiddleware);

ProjectRouter.post(
	"/",
	fileUpload(configFileUpload),
	ProjectsController.CreateProjectPostController
);

module.exports = ProjectRouter;