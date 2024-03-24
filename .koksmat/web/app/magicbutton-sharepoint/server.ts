"use server";
import { run } from "@/magicservices/run";
import { randomBytes } from "crypto";

export async function getTransactionId() {
  return randomBytes(16).toString("hex");
}
