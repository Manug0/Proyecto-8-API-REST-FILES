const { isAdmin } = require("../../middlewares/admin");
const { isAuth } = require("../../middlewares/auth");
const uploadFile = require("../../middlewares/uploadFile");

const { getGames, postGames, putGames, deleteGames } = require("../controllers/game");
const gamesRouter = require("express").Router();

const uploadGame = uploadFile("games");

gamesRouter.get("/", getGames);
gamesRouter.post("/", uploadGame.single("caratula"), postGames);
gamesRouter.put("/:id", [isAuth], putGames);
gamesRouter.delete("/:id", [isAdmin], deleteGames);

module.exports = gamesRouter;
