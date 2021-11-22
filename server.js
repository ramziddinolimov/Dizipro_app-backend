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
        })
    } catch (error) {
        
    }
}