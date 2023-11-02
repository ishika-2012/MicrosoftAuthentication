import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import AuthButton from './AuthButton';
import AuthCallback from './AuthCallback';
import jwtDecode from 'jwt-decode';

function App() {
  const { accounts, instance } = useMsal();
  console.log(accounts[0])

  useEffect(() => {
    // Decode and log the ID token when accounts change
    if (accounts.length > 0) {
      const decodedToken = jwtDecode(accounts[0].idToken);
      console.log('Decoded Token:', decodedToken);
    }
  }, [accounts]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>MSAL React App</h1>
          <Routes>
            <Route path="/auth-callback" element={<AuthCallback />} />
            <Route
              path="/"
              element={
                accounts.length === 0 ? (
                  <AuthButton msalInstance={instance} />
                ) : (
                  <div>
                    <p>Welcome, {accounts[0].name}</p>
                    <button onClick={() => instance.logout()}>Logout</button>
                  </div>
                )
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
