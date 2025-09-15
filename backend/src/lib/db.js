import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected", conn.connection.host)
    } catch (error){
        console.error("Database not connected", error)
        process.exit(1);
    }
}