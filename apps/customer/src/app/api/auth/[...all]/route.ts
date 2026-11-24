
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Authentication uses MongoDB and Node.js APIs.
// Do not execute this route in the Edge runtime.
export const runtime = "nodejs";

// Always handle authentication requests dynamically.
export const dynamic = "force-dynamic";

const handlers = toNextJsHandler(auth);

export const GET = handlers.GET;
export const POST = handlers.POST;
