const jws = require("jsonwebtoken");

const generateSign = (id) => {
	return jws.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const verifyJwt = (token) => {
	return jws.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateSign, verifyJwt };
