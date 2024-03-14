const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema(
	{
		nombre: { type: String, required: true },
		anno: { type: Number, required: true },
		precio: { type: Number, required: true },
		capacidad: { type: Number, required: true },
		logo: { type: String, required: true },
		juegosCompatibles: [{ type: mongoose.Types.ObjectId, required: false, ref: "games" }],
	},
	{
		collection: "consoles",
	}
);

const Consoles = mongoose.model("consoles", consoleSchema, "consoles");

module.exports = Consoles;
