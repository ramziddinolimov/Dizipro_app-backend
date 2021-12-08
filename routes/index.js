const Router = require("express").Router();

const AdminRouter = require("./AdminRoute");
const CountyRouter = require("./CountryRoute");
const HomeRouter = require("./HomeRoute");
const PaymentRouter = require("./PaymentRoute");
const ProjectRouter = require("./ProjectRoute");
const SkillRouter = require("./SkillRoute");
const SoftwareRouter = require("./SoftwareRoute");
const UserRouter = require("./UserRoute");

Router.use("/countries", CountyRouter);
Router.use("/users", UserRouter);
Router.use("/admin", AdminRouter);
Router.use("/skills", SkillRouter);
Router.use("/softwares", SoftwareRouter);
Router.use("/projects", ProjectRouter);
Router.use("/payments", PaymentRouter);
Router.use("/", HomeRouter);

module.exports = Router;