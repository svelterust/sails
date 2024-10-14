import type { Database } from "$lib/db";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            db: Database;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
