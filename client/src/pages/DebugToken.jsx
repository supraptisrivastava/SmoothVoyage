import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const DebugToken = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const inspectToken = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently();
        const decoded = JSON.parse(atob(token.split('.')[1]));
        console.log('🔐 Decoded Access Token:', decoded);
      } catch (err) {
        console.error('❌ Failed to decode token:', err);
      }
    };

    inspectToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  return null;
};

export default DebugToken;
