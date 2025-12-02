import mongoose from "mongoose";
import logger from "./logger.js";


export const connectDatabase = async (MONGO_URI : string) : Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI);
        const hostname = mongoose.connection.host;
        const port = mongoose.connection.port;
        const dbname = mongoose.connection.name;
        logger.info(`Databse connected successfully to host : ${hostname} : ${port} / ${dbname}`);


    }

    catch (error : any) {
        logger.error(`Dataase connection error : ${error.message}`);
        process.exit(1);
    }
}