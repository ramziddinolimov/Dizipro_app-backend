const axios = require("axios").default;

class OSON_API {
	constructor(API_KEY, MERCHANT_ID) {
		this.API_KEY = API_KEY;
		this.MERCHANT_ID = MERCHANT_ID;
	}

	async createInvoice(
		transaction_id,
		amount,
		currency,
		user_email,
		comment,
		return_url,
		lifetime,
		language
	) {