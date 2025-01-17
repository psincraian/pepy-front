import { PublicAuthSessionData } from "@/lib/authv2";

export class AuthSession {
  isLoggedIn: boolean;
  code_verifier?: string;
  state?: string;
  userInfo?: {
    email: string;
    username: string;
    groups: string[];
  };

  constructor(data: Partial<PublicAuthSessionData> = {}) {
    this.isLoggedIn = data.isLoggedIn ?? false;
    this.code_verifier = data.code_verifier;
    this.state = data.state;
    this.userInfo = data.userInfo;
  }

  isPro(): boolean {
    return this.userInfo?.groups.includes("Pro") ?? false;
  }

  isAdmin(): boolean {
    return this.userInfo?.groups.includes("Admin") ?? false;
  }
}