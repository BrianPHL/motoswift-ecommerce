// * API Timeout Constants
export const TIMEOUTS = {
    QUICK_API: 5000,        // Simple operations like count queries
    STANDARD_API: 8000,     // Standard database queries  
    HEAVY_API: 15000,       // Complex queries, reports
    FILE_UPLOAD: 60000,     // File operations
    AUTH_EXTERNAL: 10000,   // OAuth, external auth
    EXTERNAL_SERVICE: 12000 // Third-party APIs
};

// * OTP constants
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 10;
export const OTP_RESEND_COOLDOWN_IN_SECONDS = 60;

// Auth constants
export const MAX_LOGIN_ATTEMPTS = 5;
export const SESSION_DURATION_IN_DAYS = 7 * 24 * 60 * 60 * 1000;

// Validation constants
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_FILE_SIZE_IN_MB = 5 * 1024 * 1024;

// UI constants
export const TOAST_DURATION_IN_MILLISECONDS = 3000;
export const MODAL_ANIMATION_DURATION_IN_MILLISECONDS = 300;
