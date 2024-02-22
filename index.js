require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");

const app = express();

connectDB();

app.use("*", (req, res, next) => {
	return res.status(404).json("Rooute not found");
});

app.listen(3000, () => {
	console.log("Servidor activo en http://localhost:3000");
});
