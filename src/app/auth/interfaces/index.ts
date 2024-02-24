import { DocumentData } from "firebase/firestore";

export interface userDetails {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  socialMediaLinks?: DocumentData[];
}
