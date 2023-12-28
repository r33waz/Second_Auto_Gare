import { GoogleOAuthProvider,GoogleLogin } from "@react-oauth/google";


const SignInWithGoogle = () => {
  const SERVER_URL = import.meta.env.VITE_MAIN_URL;

  const successResponse = (credentialResponse) => {
    console.log("Google Sign-In Success:", credentialResponse);

    // Redirect to your server endpoint for handling the authentication
    window.location.href = SERVER_URL + "/auth/google";
  };

    return (
      <GoogleOAuthProvider>
        <GoogleLogin
          onSuccess={successResponse}
          onError={() => {
            console.log("Google Sign-In Failed");
          }}
        />
      </GoogleOAuthProvider>
    );
};

export default SignInWithGoogle;
