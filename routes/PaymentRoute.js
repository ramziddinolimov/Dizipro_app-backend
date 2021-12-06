const PaymentController = require("../controllers/PaymentController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const OSON_API = require("../modules/oson_payment");

const PaymentRouter = require("express").Router();

const OSON = new OSON_API(process.env.OSON_AUTH_TOKEN, process.env.MERCHANT_ID);

PaymentRouter.use((req, res, next) => {
	req.payments = {
		oson: OSON,
	};
	next();
});

PaymentRouter.use(AuthMiddleware);

PaymentRouter.post(
	"/:project_id",
	PaymentController.PaymentCreatePostController
);

PaymentRouter.get(
	"/:project_id",
	PaymentController.GetPaymentsProjectController
);

PaymentRouter.get(
	"/:project_id/:payment_id",
	PaymentController.checkPaymentGetController
);

module.exports = PaymentRouter;