require("dotenv").config();
const express = require("express");
const {
    customErrorMiddleware,
} = require("")

async function server() {
    try {
        const db = await pg();
        app.listen(PORT, () => console.log(`SERVER RESDY AT ${PORT}`));

        app.use(
            express.urlencoded({
                extended: true,
            })
        );

        app.use(express.json());
        app.use((req,res,next) => {
            req.db = db;
            next();
        });
        app.use("/v1", Routes);
        app.use(errorHandlerMiddleware)
    } catch (error) {
        console.log("SERVER_ERROR:", error);
    }
}


server();