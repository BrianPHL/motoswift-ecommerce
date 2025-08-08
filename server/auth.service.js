import { betterAuth } from "better-auth";

const auth = betterAuth({
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectURI: "http://localhost:5173/api/auth/callback"
        },
    },
    trustedOrigins: [
        "http://localhost:5173",
        "http://localhost:3000"
    ]
});

export default auth;
