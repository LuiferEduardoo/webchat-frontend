export interface UserInterface {
  isOnline: boolean;
  _id: string;
  username: string | null;
  name: string;
  picture: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
}