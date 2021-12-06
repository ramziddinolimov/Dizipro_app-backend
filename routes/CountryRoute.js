const { CountryGetController } = require("../controllers/CountryController");

const CountyRouter = require("express").Router();

CountyRouter.get("/", CountryGetController);

module.exports = CountyRouter;