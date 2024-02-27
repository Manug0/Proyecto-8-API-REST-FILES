const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
	{
		email: { type: String, trim: true, required: true, unique: true },
		userName: { type: String, required: true },
		contrasenna: { type: String, required: true },
		annoNacimiento: { type: Number, trim: true, required: true },
		rol: { type: String, trim: true, required: true },
		avatar: { type: String, trim: true, required: true },
	},
	{
		collection: "users",
	}
);

userSchema.pre("save", function () {
	this.contrasenna = bcrypt.hashSync(this.contrasenna, 10);
});

const User = mongoose.model("users", userSchema, "users");
module.exports = User;
