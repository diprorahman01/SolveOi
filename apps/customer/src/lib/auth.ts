
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

import { db, mongoClient } from "./mongodb";
import { sendAuthEmail } from "./auth-email";

const appUrl =
  process.env.BETTER_AUTH_URL || "http://localhost:3001";

const isDevelopment =
  process.env.NODE_ENV === "development";

function sanitizeError(value: unknown): string {
  const text =
    value instanceof Error
      ? value.message
      : typeof value === "string"
        ? value
        : "Unknown error";

  return text
    .replace(
      /mongodb(?:\+srv)?:\/\/[^\s"'`]+/gi,
      "[MONGODB_URI_REDACTED]"
    )
    .replace(
      /Bearer\s+[^\s"'`]+/gi,
      "Bearer [REDACTED]"
    );
}

export const auth = betterAuth({
  appName: "SolveOi",

  baseURL: appUrl,

  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [appUrl],

  database: mongodbAdapter(db, {
    client: mongoClient,
  }),

  logger: {
    level: isDevelopment ? "debug" : "error",
  },

  // Report the underlying authentication exception locally.
  // Keep internal error details out of browser responses.
  onAPIError: {
    onError(error) {
      if (!isDevelopment) return;

      const detail = error as Error & {
        code?: unknown;
        cause?: unknown;
      };

      const cause = detail.cause;

      console.error("\n========== SOLVEOI AUTH ERROR ==========");
      console.error("Name:", detail.name);
      console.error(
        "Code:",
        typeof detail.code === "string"
          ? detail.code
          : "Not provided"
      );
      console.error(
        "Message:",
        sanitizeError(detail)
      );

      if (cause) {
        console.error(
          "Cause:",
          sanitizeError(cause)
        );
      }

      console.error("========================================\n");
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,

    sendResetPassword: async ({ user, url }) => {
      await sendAuthEmail({
        to: user.email,
        subject: "Reset your SolveOi password",
        url,
        message: "Use this link to reset your password.",
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,

    sendVerificationEmail: async ({ user, url }) => {
      await sendAuthEmail({
        to: user.email,
        subject: "Verify your SolveOi email",
        url,
        message:
          "Verify your email address to activate your account.",
      });
    },
  },

  rateLimit: {
    enabled: true,
    window: 60,
    max: 30,
  },

  plugins: [
    organization({
      creatorRole: "owner",
      organizationLimit: 1,
      membershipLimit: 100,
      invitationLimit: 30,
      requireEmailVerificationOnInvitation: true,

      async sendInvitationEmail(data) {
        await sendAuthEmail({
          to: data.email,
          subject: `Invitation to ${data.organization.name}`,
          message:
            `${data.inviter.user.name} invited you to join ` +
            `${data.organization.name} on SolveOi.`,
          url:
            `${appUrl}/accept-invitation?id=` +
            encodeURIComponent(data.id),
        });
      },
    }),

    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),

    nextCookies(),
  ],
});
