const Console = require("../models/console");
const { deleteFile } = require("../utils/deleteFile");

const getConsole = async (req, res, next) => {
	try {
		const consoleRead = await Console.find();
		return res.status(200).json(consoleRead);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const postConsole = async (req, res, next) => {
	try {
		const newConsole = new Console(req.body);
		if (req.file) {
			newConsole.logo = req.file.path;
		}
		const saveConsole = await newConsole.save();

		return res.status(201).json(saveConsole);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const updateConsole = async (req, res, next) => {
	try {
		const { id } = req.params;
		const consoleUpdated = new Console(req.body);
		consoleUpdated._id = id;
		const update = await Console.findByIdAndUpdate(id, consoleUpdated);
		return res.status(200).json(update);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const deleteConsole = async (req, res, next) => {
	try {
		const { id } = req.params;
		const consoleDeleted = await Console.findByIdAndDelete(id);
		deleteFile(consoleDeleted.logo);
		return res
			.status(200)
			.json({ mensaje: "Consola eliminada", consoleDeleted });
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	postConsole,
	deleteConsole,
	getConsole,
	updateConsole,
};
