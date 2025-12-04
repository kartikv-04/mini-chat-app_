import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";
import logger from "../config/logger.js";

const fixIndexes = async () => {
    if (!MONGO_URI) {
        logger.error("MONGO_URI is not defined");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        logger.info("Connected to database");

        const collection = mongoose.connection.collection("workspaces");

        // Check if index exists
        const indexes = await collection.indexes();
        const joinCodeIndex = indexes.find((idx: any) => idx.name === "joinCode_1");

        if (joinCodeIndex) {
            logger.info("Found joinCode_1 index. Dropping it...");
            await collection.dropIndex("joinCode_1");
            logger.info("Successfully dropped joinCode_1 index.");
        } else {
            logger.info("joinCode_1 index not found.");
        }

        logger.info("Index fix complete. You can now restart the backend.");
        process.exit(0);
    } catch (error) {
        logger.error("Error fixing indexes: " + (error as any).message);
        process.exit(1);
    }
};

fixIndexes();
