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