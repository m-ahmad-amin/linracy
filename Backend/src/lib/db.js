import mongoose from "mongoose";

export const connectDB = async  () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("success connection with db", conn.connection.host);
    } catch (error) {
        console.log("error connecting with db", error)
    }
};