import { useEffect } from "react";
import { useAuth } from "@contexts";

const AuthCallback = () => {
  const { handleCallback } = useAuth();

  useEffect(() => {
    handleCallback();
  }, [handleCallback]);

  return <p>Redirecting...</p>;
};

export default AuthCallback;