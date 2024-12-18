export class ResponseMessage {
    token!: string;
  }

  export interface IUser {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    role?: string;
    firstNameInitial?: string;
  }