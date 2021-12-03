const { Sequelize } = require("sequelize");
const CountryModel = require("../../models/CountryModel");
const init = require("./init");
const { CustomError } = require("../../helpers/CustomError");
const UserModel = require("../../models/UserModel");
const Relations = require("../../models/Relations");
const UserSessionsModel = require("../../models/UserSessionsModel");
const EmailAttempts = require("../../models/EmailAttempts");
const BanModel = require("../../models/BanModel");
const SkillModel = require("../../models/SkillModel");
const SoftwareModel = require("../../models/SoftwareModel");
const ProjectModel = require("../../models/ProjectModel");
const ProjectsSkillModel = require("../../models/ProjectsSkillModel");
const ProjectsSoftwares = require("../../models/ProjectsSoftwares");
const ProjectsFilesModel = require("../../models/ProjectsFilesModel");
const PaymentModel = require("../../models/PaymentModel");


if (!process.env.PG_CONNECTION_URL) {
	throw new Error("PG CONNECTION STRING NOT FOUND");
}

const sequelize = new Sequelize(process.env.PG_CONNECTION_URL, {
	logging: false,
});

module.exports = async function pg() {
	try {
		await sequelize.authenticate();

		let db = {};