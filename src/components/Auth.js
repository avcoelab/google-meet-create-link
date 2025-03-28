import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/meetings/auth`);
        setAuthUrl(response.data.authUrl);
      } catch (error) {
        console.error('Error fetching auth URL:', error);
      }
    };
    fetchAuthUrl();
  }, []);

  return (
    <div className="auth-container">
      <h2>Authenticate with Google</h2>
      {authUrl ? (
        <a href={authUrl} className="auth-button">
          Connect Google Calendar
        </a>
      ) : (
        <p>Loading authentication...</p>
      )}
    </div>
  );
};

export default Auth;