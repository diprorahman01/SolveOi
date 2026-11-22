import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db, mongoClient } from "./mongodb";
import { sendAuthEmail } from "./auth-email";

const appUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
export const auth = betterAuth({
  appName: "SolveOi",
  baseURL: appUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [appUrl],
  database: mongodbAdapter(db, { client: mongoClient }),
  emailAndPassword: {
    enabled: true, requireEmailVerification: true,
    minPasswordLength: 12, maxPasswordLength: 128,
    sendResetPassword: async ({user, url}) => {
      await sendAuthEmail({ to: user.email, subject: "Reset your SolveOi password", url,
        message: "Use this link to reset your password." });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({user, url}) => {
      await sendAuthEmail({ to: user.email, subject: "Verify your SolveOi email", url,
        message: "Verify your email address to activate your account." });
    },
  },
  rateLimit: { enabled: true, window: 60, max: 30 },
  plugins: [
    organization({
      creatorRole: "owner", organizationLimit: 1,
      membershipLimit: 100, invitationLimit: 30,
      requireEmailVerificationOnInvitation: true,
      async sendInvitationEmail(data) {
        await sendAuthEmail({
          to: data.email,
          subject: `Invitation to ${data.organization.name}`,
          message: `${data.inviter.user.name} invited you to join ${data.organization.name} on SolveOi.`,
          url: `${appUrl}/accept-invitation?id=${encodeURIComponent(data.id)}`,
        });
      },
    }),
    admin({ defaultRole: "user", adminRoles: ["admin"] }),
    nextCookies(),
  ],
});
