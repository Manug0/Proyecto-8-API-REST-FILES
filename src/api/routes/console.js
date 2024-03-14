const uploadFile = require("../../middlewares/uploadFile");

const { getConsole, postConsole, updateConsole, deleteConsole } = require("../controllers/console");

const consoleRouter = require("express").Router();

const uploadConsole = uploadFile("consoles");

consoleRouter.get("/", getConsole);
consoleRouter.post("/", uploadConsole.single("logo"), postConsole);
consoleRouter.put("/:id", updateConsole);
consoleRouter.delete("/:id", deleteConsole);

module.exports = consoleRouter;
