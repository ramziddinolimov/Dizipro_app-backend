const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AdminMiddleware = require("../middlewares/AdminMiddleware");
const SoftwaresController = require("../controllers/SoftwareController");

const SoftwareRouter = require("express").Router();

SoftwareRouter.use(AuthMiddleware);

SoftwareRouter.post(
	"/",
	AdminMiddleware,
	SoftwaresController.AddSoftwarePostController
);
SoftwareRouter.get("/", SoftwaresController.SoftwaresGetController);

module.exports = SoftwareRouter;