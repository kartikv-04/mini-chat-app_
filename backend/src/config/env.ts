import dotenv from "dotenv";
dotenv.config();

export const PORT=process.env.PORT || 5000
export const REFRESH_SECRET=process.env.REFRESH_SECRET
export const ACCESS_SECRET=process.env.ACCESS_SECRET
export const MONGO_URI=process.env.MONGO_URI
export const LOG_LEVEL=process.env.LOG_LEVEL || "info"


