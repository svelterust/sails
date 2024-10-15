import { type Database } from "$lib/db";
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
