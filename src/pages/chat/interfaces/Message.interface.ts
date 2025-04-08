export interface MessageInterface {
  _id: string;
  senderId: string;
  message: string;
  timestamp: string;
  groupId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SenderMessageInterface {
  senderId: string;
  senderUsername: string;
  senderName: string;
  senderPicture: string;
  senderIsOnline: boolean;
  lastMessage: {
    id: string;
    content: string;
    timestamp: string;
  };
  messageCount: number;
}