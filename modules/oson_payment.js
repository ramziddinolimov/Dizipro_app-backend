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

        let response = await axios({
			url: "https://api.oson.uz/api/invoice/create",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				token: this.API_KEY,
			},
			method: "POST",
			data: {
				merchant_id: this.MERCHANT_ID,
				transaction_id,
				amount,
				currency,
				user_account: user_email,
				comment,
				return_url,
				lifetime,
				language,
			},
		});