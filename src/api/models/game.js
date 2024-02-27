const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
	{
		titulo: { type: String, trim: true, required: true },
		desarrolladora: { type: String, trim: true, required: true },
		precio: { type: Number, trim: true, required: true },
		anno: { type: Number, trim: true, required: true },
		descripcion: { type: String, trim: true, required: true },
		caratula: { type: String, trim: true, required: true },
		categoria: { type: String, trim: true, required: true },
	},
	{
		collection: "games",
	}
);

const Game = mongoose.model("games", gameSchema, "games");

module.exports = Game;
