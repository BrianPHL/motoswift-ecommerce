import { OTP_LENGTH } from './constants.js';

export const isValidOTP = (otp) => {
    return otp && otp.length === OTP_LENGTH && /^\d+$/.test(otp);
};

export const cleanOTPInput = (input) => {
    return input.replace(/\D/g, '').slice(0, OTP_LENGTH);
};
