const UserController = require("../controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.post("/account", UserController.UserCreateAccountPostController);
UserRouter.post("/", UserController.UserLoginAccountPostController);
UserRouter.post(
	"/password",
	UserController.UserRecoveryPasswordSubmitPostController
);
UserRouter.get(
	"/password/:attempt_id",
	UserController.UserRecoveryPasswordCheckGetController
);

module.exports = UserRouter;