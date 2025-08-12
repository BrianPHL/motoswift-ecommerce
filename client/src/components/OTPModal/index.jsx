import styles from './OTPModal.module.css';
import { Modal, Button } from '@components';
import { isValidOTP, cleanOTPInput, performOperationWithTimeout, TIMEOUTS } from '@utils';
import { useState } from 'react';

const OTPModal = ({ isOpen, onClose, userEmail, onSuccess }) => {
    const [ oneTimePassword, setOneTimePassword ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState('');

    const sendOTP = async () => {

        setLoading(true);
        
        try {
            
            // const response = await fetch('/api/oauth/send-otp', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: userEmail })
            // });

            const response = await performOperationWithTimeout(
                fetch('/api/oauth/send-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userEmail })
                }),
                TIMEOUTS.EXTERNAL_SERVICE
            );
            
            if (response.ok) {
                setMessage('OTP sent to your email!');
            } else {
                setMessage('Failed to send OTP');
            }
        } catch (err) {
            if (err.message === 'Operation timed out') {
                setMessage('OTP request timed out. Please try again.');
            } else {
                setMessage('Error sending OTP');
                console.error(err);
            }
        }
        setLoading(false);
    };

    const verifyOTP = async () => {

        if (!isValidOTP(oneTimePassword)) {
            setMessage('Please enter 6-digit code');
            return;
        }

        setLoading(true);

        try {

            const response = await performOperationWithTimeout(
                fetch('/api/oauth/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userEmail, oneTimePassword })
                }),
                TIMEOUTS.STANDARD_API
            );
            
            if (response.ok) {
                onSuccess();
                onClose();
            } else {
                setMessage('Invalid OTP code');
                // setOneTimePassword('');
            }
        } catch (err) {
            if (err.message === 'Operation timed out') {
                setMessage('Verification timed out. Please try again.');
            } else {
                setMessage('Error verifying OTP');
            }
        }
        setLoading(false);
    };

    const handleOneTimePasswordChange = (event) => {
        const cleaned = cleanOTPInput(event.target.value);
        setOneTimePassword(cleaned);
    };

    if (!isOpen) return null;

    return (
        <Modal label="Email Verification" isOpen={isOpen} onClose={onClose}>
            <div className={styles.content}>
                <h3>Verify Your Email</h3>
                <p>Enter the 6-digit code sent to {userEmail}</p>
                
                {message && <p className={styles.message}>{message}</p>}
                
                <input
                    type="text"
                    maxLength="6"
                    value={ oneTimePassword }
                    onChange={(e) => setOneTimePassword(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code"
                    className={styles.otpInput}
                />
                
                <div className={styles.buttons}>
                    <Button
                        label="Send Code"
                        type="secondary"
                        action={sendOTP}
                        disabled={loading}
                    />
                    <Button
                        label="Verify"
                        type="primary"
                        action={verifyOTP}
                        disabled={loading || oneTimePassword.length !== 6}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default OTPModal;
