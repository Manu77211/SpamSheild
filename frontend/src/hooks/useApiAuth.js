import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import apiService from '../services/api';

// Hook to set up API authentication with Clerk
export const useApiAuth = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      // Set up the token getter function for the API service
      apiService.setAuthTokenGetter(async () => {
        if (isSignedIn) {
          try {
            return await getToken();
          } catch (error) {
            console.error('Failed to get Clerk token:', error);
            return null;
          }
        }
        return null;
      });
    }
  }, [getToken, isLoaded, isSignedIn]);

  return { isLoaded, isSignedIn };
};