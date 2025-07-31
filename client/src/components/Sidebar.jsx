import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const SideBar = () => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return (
    <aside className="bg-white shadow border-r w-64 p-4 hidden lg:block">
      <nav className="flex flex-col space-y-3">
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/create-trip" className="hover:text-blue-600">Create Trip</Link>
      </nav>
    </aside>
  );
};

export default SideBar;
