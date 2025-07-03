import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Icons from '../Icons/Icons'
import './style.css'
import Alert from '../Alert/Alert'



export default function LoginSingUpForm() {

  const facebookAppId = process.env.REACT_APP_FACEBOOK_CLIENT_ID;

  const [isActive, setActive] = useState(false)
  const [userDetail, setUserDetail] = useState({})
  const [isResponseSuccessful, setIsResponseSuccessful] = useState(false)
  const [alert, setAlert] = useState({})
  const navigate = useNavigate();

  const handleGoogleLogin = (credentialResponse) => {
    if (credentialResponse.credential) {
      localStorage.setItem('authToken', JSON.stringify(credentialResponse.credential));
      navigate("/dashboard");
    }
  };

  const loginWithGitHub = () => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000&scope=user`;
    window.location.href = githubAuthURL
  }


  const linkedInLogin = () => {
    const clientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
    const redirectUri = 'http://localhost:3000';
    const state = 'secure_random_string';
    const scope = "openid profile email";

    window.location.href =
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`;
  };


  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;
    localStorage.setItem('authToken', code)
    navigate("/dashboard");
  }, []);


  useEffect(() => {
    // Inject Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
    };

    // Load Facebook SDK script
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, [facebookAppId]);

  // ✅ Facebook Login Handler
  const handleFacebookLogin = () => {
    if (!window.FB) return;
    window.FB.login(function (response) {
      if (response.authResponse) {
        window.FB.api('/me', { fields: 'name,email,picture' }, function (userInfo) {
          localStorage.setItem('authToken', userInfo.id);
          localStorage.setItem('profilePicture', userInfo.picture.data.url);
          navigate("/dashboard");
        });
      } else {
        console.log("User cancelled login or did not authorize.");
      }
    }, { scope: 'public_profile,email' });
  };


  useEffect(() => {
    let token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
    else {
      navigate("/");
    }
  }, [navigate]);

  const handleOnChange = (event) => {
    setUserDetail({ ...userDetail, [event.target.name]: event.target.value });
  }

  const toggleActive = (event) => {
    const button = event.target
    button.disabled = true
    setActive(!isActive)
    setTimeout(() => { button.disabled = false }, 1000)
  }

  const loginUser = async (event) => {
    event.preventDefault();

    await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userDetail,
      }),
    })
      .then(async res => {
        if (res.status === 200) {
          setIsResponseSuccessful(true);
          setAlert({
            "msg": "Login Successful",
            'className': 'primary'
          })
          setTimeout(() => {
            setIsResponseSuccessful(false);
          }, 1500);
          let response = await res.json()
          localStorage.setItem("authToken", response.accessToken);
          localStorage.setItem('user', JSON.stringify(response));
          navigate("/dashboard");
        }
        else {
          setIsResponseSuccessful(true)
          setAlert({
            "msg": "Invalid Credential",
            'className': 'danger'
          })
          setTimeout(() => {
            setIsResponseSuccessful(false);
          }, 1500);
        }
      }).catch((error) => {
        console.log(error)
      }
      );
  }

  const createUser = async (event) => {
    event.preventDefault();

    await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetail)
    })
      .then(response => response.json())
      .then(data => {
        setIsResponseSuccessful(true);
        setAlert({
          "msg": "Register Successful",
          'className': 'primary'
        })
        setTimeout(() => {
          setIsResponseSuccessful(false);
        }, 1500);
      }).catch((error) => {
        setIsResponseSuccessful(true)
        setAlert({
          "msg": "Something went wrong.",
          'className': 'danger'
        })
        setTimeout(() => {
          setIsResponseSuccessful(false);
        }, 1500);
      }
      );
  }


  return (
    <div className="login-background">
      <div className={`wapper-box ${isActive ? 'active' : ''} shadow`} >

        <div className="dont-acc">
          <h1 className='text-white display-5 fw-bold '>Hello Welcome!</h1>
          <p className='text-white fs-4 fw-medium'>Don't have an account?</p>
          <button className='dont-acc-btn ' onClick={toggleActive}>Register</button>
        </div>


        <div className="login-form">
          <div className="login-content ">
            <h1 className={`${isResponseSuccessful ? 'mb-0' : 'mb-5'} display-3 fw-bold`}>Login</h1>
            {isResponseSuccessful && <Alert alert={alert} />}
            <form onSubmit={loginUser}>
              <div className="inputs mb-4">
                <input type="text" name="username" id="username" onChange={handleOnChange} value={userDetail.username} placeholder='Enter User Name' required />
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="inputs mb-4">
                <input type="Password" name="password" id="password" onChange={handleOnChange} value={userDetail.password} placeholder='Enter Password' required />
                <i className="fa-solid fa-lock"></i>
              </div>
              <div className='text-center mb-3'>
                <a href="#" className='text-decoration-none text-dark'>Forget Password?</a>
              </div>
              <button>Login</button>
            </form>
            <Icons handleGoogleLogin={handleGoogleLogin} linkedInLogin={linkedInLogin} handleFacebookLogin={handleFacebookLogin} loginWithGitHub={loginWithGitHub} />
          </div >
        </div >

        <div className="toggle-box"></div>

        <div className="register-form">
          <div className="login-content">
            <h1 className={`${!isResponseSuccessful ? 'mb-5' : 'mb-3'} display-3 fw-bold`}>SignUp</h1>
            {isResponseSuccessful && <Alert alert={alert} />}

            <form onSubmit={createUser}>
              <div className="inputs mb-4">
                <input type="text" name="username" value={userDetail.username} id="username" placeholder='Username' onChange={handleOnChange} required />
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="inputs mb-4">
                <input type="email" name="email" id="email" value={userDetail.email} placeholder='Email' onChange={handleOnChange} required />
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="inputs mb-4">
                <input type="Password" name="password" value={userDetail.password} id="password" placeholder='Password' onChange={handleOnChange} minLength={8} />
                <i className="fa-solid fa-lock"></i>
              </div>
              <button >SignUp</button>
            </form>
          </div>
        </div>

        <div className="already-acc">
          <h1 className='text-white display-5 fw-bold '>Hello Welcome!</h1>
          <p className='text-white fs-4 fw-medium'>Already have an account?</p>
          <button className='dont-acc-btn ' onClick={toggleActive}>Login</button>
        </div>

      </div >
    </div >
  )
}
