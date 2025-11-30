import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import apiService from '../services/api';
import { supabase } from '../lib/supabase';

// Hook to set up API authentication with Supabase
export const useApiAuth = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Set up the token getter function for the API service
      apiService.setAuthTokenGetter(async () => {
        if (user) {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            return session?.access_token || null;
          } catch (error) {
            console.error('Failed to get Supabase token:', error);
            return null;
          }
        }
        return null;
      });
    }
  }, [user, loading]);

  return { isLoaded: !loading, isSignedIn: !!user };
};