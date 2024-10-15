import { type Database } from "$lib/db";
import { type User, type Session } from "$lib/schema";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
      session: Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
