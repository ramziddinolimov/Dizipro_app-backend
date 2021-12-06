const { HomeGetController } = require("../controllers/HomeController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const HomeRouter = require("express").Router();

HomeRouter.use(AuthMiddleware);

HomeRouter.get("/", HomeGetController);

module.exports = HomeRouter;