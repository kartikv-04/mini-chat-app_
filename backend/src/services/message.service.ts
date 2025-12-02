import messageModel from "../model/message.model.js";

interface CreateMessageDTO {
  content: string;
  channelId: string;
  userId: string;
}

export async function createMessageService({
  content,
  channelId,
  userId,
}: CreateMessageDTO) {
  if (!content || !channelId || !userId) {
    throw new Error("Missing content/channelId/userId");
  }

  const msg = await messageModel.create({
    content,
    channel: channelId,
    sender: userId,
  });

  return msg;
}

export async function getChannelMessagesService(
  channelId: string,
  page = 1,
  limit = 30
) {
  if (!channelId) throw new Error("channelId is required");

  const skip = (page - 1) * limit;

  const messages = await messageModel.find({ channel: channelId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("sender", "_id name email avatar");

  return messages;
}

export async function editMessageService(
  messageId: string,
  userId: string,
  newContent: string
) {
  if (!messageId || !userId || !newContent) {
    throw new Error("Missing messageId/userId/newContent");
  }

  const msg = await messageModel.findById(messageId);

  if (!msg) throw new Error("Message not found");

  // Only the sender can edit
  if (msg.sender.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  msg.content = newContent;
  msg.isEdited = true;
  msg.editedAt = new Date();

  await msg.save();

  return msg;
}

export async function deleteMessageService(messageId: string, userId: string) {
  if (!messageId || !userId) throw new Error("Missing messageId/userId");

  const msg = await messageModel.findById(messageId);
  if (!msg) throw new Error("Message not found");

  if (msg.sender.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await messageModel.findByIdAndDelete(messageId);

  return true;
}
