import React, { useRef } from 'react'
import { GoogleLogin } from '@react-oauth/google'


export default function Icons({ handleGoogleLogin, handleFacebookLogin, linkedInLogin, loginWithGitHub }) {
 
  const intervalRef = useRef(null);
  const focusInput = () => {
    document.getElementsByClassName("L6cTce")[0].click()
  };
  return (
    <>
      <p className='mt-3 mb-2'>Login with socail media platforms</p>
      <div className="socail-media-icons">
        <div style={{ display: "none" }} ref={intervalRef}  >
          <GoogleLogin
            className='google-button'
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>
        <i class="fa-brands fa-google" onClick={focusInput}></i>
        <i class="fa-brands fa-linkedin-in" onClick={linkedInLogin}></i>
        <i class="fa-brands fa-facebook-f" onClick={handleFacebookLogin}></i>
        <i class="fa-brands fa-github" onClick={loginWithGitHub} ></i>
      </div >
    </>
  )
}
