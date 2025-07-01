import React, { useEffect } from 'react';

export default function FacebookLoginButton() {
  useEffect(() => {
    // Load SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID', // ✅ Replace with your actual App ID
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });
    };

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      document.body.appendChild(script);
    }
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('Facebook login success:', response);
        window.FB.api('/me', { fields: 'name,email,picture' }, function (userInfo) {
          console.log('User Info:', userInfo);
          localStorage.setItem('fbUser', JSON.stringify(userInfo));
          // Redirect if needed
        });
      } else {
        console.log('Facebook login failed or cancelled.');
      }
    }, { scope: 'public_profile,email' });
  };

  return (
    <button onClick={handleFacebookLogin} className="btn btn-primary">
      Login with Facebook
    </button>
  );
}
