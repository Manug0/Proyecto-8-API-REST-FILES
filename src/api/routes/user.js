const uploadUser = require("../../middlewares/userFile");
const { isAuth } = require("../../middlewares/auth");
const {
	registerUser,
	login,
	deleteUser,
	getUser,
	updateUser,
} = require("../controllers/user");
const { isAdmin } = require("../../middlewares/admin");

const userRouter = require("express").Router();

userRouter.get("/", getUser);
userRouter.post("/register", uploadUser.single("avatar"), registerUser);
userRouter.post("/login", login);
userRouter.put("/:id", [isAdmin], updateUser);
userRouter.delete("/:id", [isAuth], deleteUser);

module.exports = userRouter;
