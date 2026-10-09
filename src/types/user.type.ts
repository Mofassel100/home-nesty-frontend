export type UserRole = "SUPER_ADMIN" | "ADMIN" | "PROVIDER" | "CUSTOMER";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export interface User {
  id: string;
  name: string;
  email: string;
  googleId: null | string;
  authProvider: string;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  needPasswordChange: boolean;
  imageUrl: null | string;
  imagePublicId: null | string;
  isDeleted: boolean;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
}
export interface IUpUser {
  name?: string;
  email?: string;
  emailVerified?: boolean;
  role?: UserRole;
  status?: UserStatus;
  needPasswordChange?: boolean;
  imageUrl?: null | string;
  imagePublicId?: null | string;
  isDeleted?: boolean;
}


export interface IUserPayload {
  homeBanner: File;
  data: IUpUser;
}

export interface IUserUpdatedPayload {
  image: File | null;
  data: IUpUser;
}
export interface IUserEditPayload {
  id: string;
  payload: IUserUpdatedPayload;
}