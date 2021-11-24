module.exports = class CountryController {
    static async CountryGetController(req, res, next){
        try {
            const countries = await req.db.countries.findAll();

            res.json({
                ok: true,
                message: 'OK',
                data: {
                    countries,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}