import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true, trim: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Added required
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true }, // Added required
    isEdited: { type: Boolean, default: false }, // Optional: for edit feature
    editedAt: { type: Date } // Optional: for edit feature
}, { timestamps: true }); //  gives  createdAt & updatedAt automatically

// Add index for faster queries
messageSchema.index({ channel: 1, createdAt: -1 });

export default mongoose.model("Message", messageSchema);