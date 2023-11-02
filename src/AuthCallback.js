import React, { useEffect } from 'react';
import { useMsalAuthentication } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


function AuthCallback() {
    const { instance } = useMsalAuthentication('loginPopup');
    const navigate = useNavigate();
 
    useEffect(() => {
      console.log("First");
      // Handle the callback from the authentication provider
      console.log('Is callback:', instance?.isCallback(window.location.hash));
      if (instance?.isCallback(window.location.hash)) {
        instance?.handleRedirectPromise()
          .then((response) => {
           
            // Handle successful authentication
            console.log('Authentication successful:', response);


            console.log('Full Response:', response);
 
           
            const token = response.accessToken;
            console.log('Access Token:', token);
            console.log(response)


             // Decode the token and get user information
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);
 
            // Redirect to the home page or another desired page
            //navigate('/');
          })
          .catch((error) => {
            // Handle authentication failure
            console.error('Authentication error:', error);
 
            // Redirect to an error page or the home page
            navigate('/');
          });
      }
    }, [instance, navigate]);
 
    return (
      <div>
        <p>Processing authentication...</p>
      </div>
    );
  }
 
  export default AuthCallback;
