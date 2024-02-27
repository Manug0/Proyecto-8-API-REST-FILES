require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const gamesRouter = require("./src/api/routes/game");
const userRouter = require("./src/api/routes/user");
const consoleRouter = require("./src/api/routes/console");
const cloudinary = require("cloudinary").v2;

const app = express();

connectDB();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/consoles", consoleRouter);
app.use("/api/v1/games", gamesRouter);

app.use("*", (req, res, next) => {
	return res.status(404).json("Route not found");
});

app.listen(3000, () => {
	console.log("Servidor activo en http://localhost:3000");
});
