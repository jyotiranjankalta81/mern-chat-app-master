import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		// await mongoose.connect(process.env.MONGO_DB_URI);
		await mongoose.connect('mongodb+srv://jyotiranjankalta81:WkJ2Jt1EEhqHxext@cluster0.euwgmpp.mongodb.net/')
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
