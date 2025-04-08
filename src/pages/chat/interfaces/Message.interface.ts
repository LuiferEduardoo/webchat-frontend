export interface MessageInterface {
  _id: string;
  senderId: {
    _id: string;
    username: string;
    name: string;
    picture: string;
    isOnline: boolean;
  };
  receiverId?: {
    _id: string;
    username: string;
    name: string;
    picture: string;
    isOnline: boolean;
  };
  message: string;
  timestamp: string;
  groupId: string;
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