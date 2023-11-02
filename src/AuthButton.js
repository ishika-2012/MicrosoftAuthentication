import React from 'react';
import { config } from './Config';


function AuthButton({ msalInstance }) {
  const login = async () => {
    try {
      // Check if an interaction is in progress before initiating a new one
      const interactionInProgress = msalInstance.getAccountByHomeId(msalInstance.getActiveAccount()?.homeAccountId)?.interactionInProgress;

      if (!interactionInProgress) {
        // Clear cache before initiating new login redirect
        await msalInstance.clearCache();

        // Add a delay before initiating login redirect
        setTimeout(async () => {
          const interactionInProgressAfterDelay = msalInstance.getAccountByHomeId(msalInstance.getActiveAccount()?.homeAccountId)?.interactionInProgress;
          
          if (!interactionInProgressAfterDelay) {
            // If no interaction is in progress, initiate login redirect
            await msalInstance.loginRedirect({
              scopes: config.scopes,
              prompt: 'select_account'
            });

            // Get information about the authenticated user after login
            const account = msalInstance.getAccount(); // Use the appropriate method based on your MSAL version
            console.log('Authenticated User:', account);
           

            // Access specific user information like roles
            if (account.idTokenClaims) {
              const userRoles = account.idTokenClaims.roles;
              console.log('User Roles:', userRoles);
            }
          } else {
            console.log("Interaction is already in progress. Waiting for it to complete.");
          }
        }, 1000);
      } else {
        console.log("Interaction is already in progress. Waiting for it to complete.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default AuthButton;
