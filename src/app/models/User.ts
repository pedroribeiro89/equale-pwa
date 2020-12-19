export interface User {
  id: string,
  email: string,
  type: UserType;
}

export enum UserType {
  STUDENT = 2,
  SUPPORTER = 3
}
