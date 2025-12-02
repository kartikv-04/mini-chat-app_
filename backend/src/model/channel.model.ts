import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true, trim: true },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
    description: { type: String, default: "" }, 
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } 
}, { timestamps: true });

export default mongoose.model("Channel", channelSchema);