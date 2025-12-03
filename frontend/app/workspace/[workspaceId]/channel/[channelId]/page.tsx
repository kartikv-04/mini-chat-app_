"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useMessageStore } from "@/store/message.store";
import { api } from "@/lib/api";

export default function ChannelPage({ params }: any) {
  const channelId = params.channelId;
  const { fetchMessages, addMessage, clearMessages } = useMessageStore();

  useEffect(() => {
    const socket = getSocket();

    fetchMessages(channelId);
    socket.emit("join-channel", channelId);

    socket.on("message:new", addMessage);

    return () => {
      socket.emit("leave-channel", channelId);
      socket.off("message:new", addMessage);
      clearMessages();
    };
  }, [channelId]);

  return <div />; // empty page is fine
}

const { addMessage } = useMessageStore();

async function sendMessage(channelId: string, content: string) {
  if (!content.trim()) return;

  const res = await api.post("/messages", {
    channelId,
    content,
  });


  addMessage(res.data.data);
}