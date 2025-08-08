import { useAuth } from "@contexts";

const GoogleLoginButton = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <button onClick={ signInWithGoogle }>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;