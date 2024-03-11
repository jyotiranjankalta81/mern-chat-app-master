// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// const protectRoute = async (req, res, next) => {
// 	try {
// 		const token = req.cookies.jwt;

// 		if (!token) {
// 			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
// 		}

// 		// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// 		const decoded = jwt.verify(token, 'your serect key');

// 		if (!decoded) {
// 			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
// 		}

// 		const user = await User.findById(decoded.userId).select("-password");

// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" });
// 		}

// 		req.user = user;

// 		next();
// 	} catch (error) {
// 		console.log("Error in protectRoute middleware: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

// export default protectRoute;


import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Replace 'your secret key' with your actual secret key used for signing
		const secretKey = process.env.JWT_SECRET || 'your secret key';
		const decoded = jwt.verify(token, secretKey);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({ error: "Unauthorized - Token has expired" });
		}
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;

