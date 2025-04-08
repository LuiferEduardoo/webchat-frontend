export interface MessageObjectInterface {
  message: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
}