const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSign } = require("../utils/jwt");
const { deleteFile } = require("../utils/deleteFile");

const getUser = async (req, res, next) => {
	try {
		const userRead = await User.find();
		return res.status(200).json(userRead);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const registerUser = async (req, res, next) => {
	try {
		const newUser = new User(req.body);
		if (req.file) {
			newUser.avatar = req.file.path;
		}

		const userDuplicated = await User.findOne({
			userName: req.body.userName,
		});

		if (userDuplicated) {
			return res.status(400).json("Ese nombre de usuario ya existe");
		}

		const saveUser = await newUser.save();

		return res.status(201).json(saveUser);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ userName: req.body.userName });

		if (user) {
			if (bcrypt.compareSync(req.body.contrasenna, user.contrasenna)) {
				const token = generateSign(user._id);
				return res.status(200).json({ user, token });
			} else {
				return res
					.status(400)
					.json("El nombre o la contraseña no son correctos");
			}
		} else {
			return res.status(400).json("El nombre o la contraseña no son correctos");
		}
	} catch (error) {
		return res.status(400).json(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const userUpdated = new User(req.body);
		userUpdated._id = id;
		const update = await User.findByIdAndUpdate(id, userUpdated);
		return res.status(200).json(update);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const userDeleted = await User.findByIdAndDelete(id);
		deleteFile(userDeleted.avatar);
		return res.status(200).json({ mensaje: "Usuario eliminado", userDeleted });
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	getUser,
	registerUser,
	login,
	updateUser,
	deleteUser,
};
