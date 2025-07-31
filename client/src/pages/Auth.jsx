import { useAuth0 } from '@auth0/auth0-react';

const Auth = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <p className="mt-20 text-center text-lg">You are already logged in.</p>;
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <button
        onClick={() => loginWithRedirect()}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
      >
        Login with Auth0
      </button>
    </div>
  );
};

export default Auth;
