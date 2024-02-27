const Game = require("../models/game");
const { deleteFile } = require("../utils/deleteFile");

const getGames = async (req, res, next) => {
	try {
		const games = await Game.find();
		return res.status(200).json(games);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const postGames = async (req, res, next) => {
	try {
		const newGame = new Game(req.body);
		if (req.file) {
			newGame.caratula = req.file.path;
		}
		const saveGame = await newGame.save();
		return res.status(201).json(saveGame);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const putGames = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updateGame = new Game(req.body);
		updateGame._id = id;
		const update = await Game.findByIdAndUpdate(id, updateGame);
		return res.status(200).json(update);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const deleteGames = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteGame = await Game.findByIdAndDelete(id);
		deleteFile(deleteGame.caratula);
		return res.status(200).json({ mensaje: "Juego eliminado", deleteGame });
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = { getGames, postGames, putGames, deleteGames };
