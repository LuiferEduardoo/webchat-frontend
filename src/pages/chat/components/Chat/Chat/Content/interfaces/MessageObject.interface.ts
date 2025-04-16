export interface MessageObjectInterface {
  message: string;
  receiverId?: string;
  groupId?: string;
}

export interface MessageProps {
  text: string;
  sender: "sender" | "receiver";
  senderInformation?: {
    _id: string;
    name: string;
    picture: string;
  }
}