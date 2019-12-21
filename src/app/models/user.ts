export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  password?: string;
  isAdmin?: boolean;
}
