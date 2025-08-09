import { betterAuth } from "better-auth";
import db from "./db.js";

const auth = betterAuth({
    // database: db,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectURI: "http://localhost:3000/api/auth/callback/google",
            prompt: "select_account"
        },
    },
    trustedOrigins: [
        "http://localhost:5173",
        "http://localhost:3000"
    ]
});

export default auth;
