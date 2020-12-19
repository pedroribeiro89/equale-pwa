export interface Chat {
  receiver: Receiver;
  messages: Message[];
}

export interface Receiver {
  id: number;
  email: string;
}

export interface Message {
  id: number;
  message: string;
  createdAt: Date;
  receiverId: number;
}
