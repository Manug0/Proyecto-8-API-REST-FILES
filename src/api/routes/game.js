const { isAdmin } = require("../../middlewares/admin");
const { isAuth } = require("../../middlewares/auth");
const uploadGame = require("../../middlewares/gameFile");

const {
	getGames,
	postGames,
	putGames,
	deleteGames,
} = require("../controllers/game");
const gamesRouter = require("express").Router();

gamesRouter.get("/", getGames);
gamesRouter.post("/", uploadGame.single("caratula"), postGames);
gamesRouter.put("/:id", putGames);
gamesRouter.delete("/:id", [isAdmin], deleteGames);

module.exports = gamesRouter;
