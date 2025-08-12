import { betterAuth } from "better-auth";
import pool from "./db.js";

export const auth = betterAuth({
    database: pool,
    secret: process.env.BETTER_AUTH_SECRET,
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectURI: "http://localhost:3000/api/auth/callback/google",
            prompt: "select_account consent login",
            
        },
    },
    trustedOrigins: [
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    user: {
        modelName: "oauth_users",
        fields: {
            emailVerified: "email_verified",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    },
    session: {
        modelName: "oauth_sessions",
        fields: {
            userId: "user_id",
            ipAddress: "ip_address",
            userAgent: "user_agent",
            expiresAt: "expires_at",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    },
    account: {
        modelName: "oauth_accounts",
        fields: {
            userId: "user_id",
            accountId: "oauth_account_id",
            providerId: "provider_id",
            accessToken: "access_token",
            refreshToken: "refresh_token",
            accessTokenExpiresAt: "access_token_expires_at",
            refreshTokenExpiresAt: "refresh_token_expires_at",
            idToken: "id_token",
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
    verification: {
        modelName: "oauth_verifications",
        fields: {
            expiresAt: "expires_at",
            createdAt: "created_at",
            updatedAt: "updated_at"
        },
    },
    advanced: {
        database: {
            generateId: false
        }
    }
});
