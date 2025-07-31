import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
