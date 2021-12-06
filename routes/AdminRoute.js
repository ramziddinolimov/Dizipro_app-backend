const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AdminMiddleware = require("../middlewares/AdminMiddleware");
const AdminController = require("../controllers/AdminController");

const AdminRouter = require("express").Router();

AdminRouter.use([AuthMiddleware, AdminMiddleware]);

AdminRouter.post("/bans", AdminController.CreateBanPostController);
AdminRouter.delete("/bans/:ban_id", AdminController.DeleteBanController);
AdminRouter.get("/users", AdminController.GetAllUsersController);

module.exports = AdminRouter;