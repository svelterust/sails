import { type Database } from "$lib/database";
import { type SafeUser, type Session } from "$lib/schema";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: SafeUser | null;
      session: Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
