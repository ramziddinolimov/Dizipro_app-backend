require("dotenv").config();
const express = require("express");
const {
	customErrorMiddleware,
} = require("./middlewares/customErrorMiddleware");
const Routes = require("./routes");
const app = express();
const pg = require("./modules/pg/pg");
const { errorHandlerMiddleware } = require("./helpers/CustomError");
const PORT = process.env.PORT || 8080;

async function server() {
	try {
		const db = await pg();
		app.listen(PORT, () => console.log(`SERVER READY AT ${PORT}`));

		app.use(
			express.urlencoded({
				extended: true,
			})
		);

		app.use(express.json());

		app.use((req, res, next) => {
			req.db = db;
			next();
		});
		app.use(customErrorMiddleware);

		app.use("/v1", Routes);
		app.use(errorHandlerMiddleware);
	} catch (error) {
		console.log("SERVER_ERROR:", error);
	}
}

server();