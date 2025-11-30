import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle hash-based OAuth callbacks
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (accessToken) {
          // If we have an access token in the hash, let Supabase handle it
          const { data, error } = await supabase.auth.getSession();
          if (data.session) {
            navigate('/dashboard', { replace: true });
            return;
          }
        }

        // Handle regular callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/login', { replace: true });
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to dashboard
          navigate('/dashboard', { replace: true });
        } else {
          // No session, redirect to login
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p className="text-gray-300">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;