export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  avatar?: string;
  role?: "buyer" | "seller" | "admin";
}