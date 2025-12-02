import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workspace" }],
    refreshToken : {type : String},
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("User", userSchema);