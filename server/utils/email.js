
export const createOTPEmail = (oneTimePassword, userName = 'there') => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Your Verification Code</h2>
            <p>Hi ${ userName },</p>
            <p>Your verification code is:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #f8f9fa; border: 2px dashed #007bff; padding: 20px; border-radius: 10px; display: inline-block;">
                    <h1 style="color: #007bff; margin: 0; font-size: 2.5em; letter-spacing: 0.2em; font-family: monospace;">
                        ${ oneTimePassword }
                    </h1>
                </div>
            </div>
            
            <p style="text-align: center; color: #666; font-size: 14px;">
                Enter this code to verify your email address. Code expires in 5 minutes.
            </p>
        </div>
    `;
};
