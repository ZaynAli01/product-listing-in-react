import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Icons from '../Icons/Icons'
import './style.css'
import Alert from '../Alert/Alert'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function LoginSingUpForm() {

  const handleGoogleLogin = (credentialResponse) => {
    if (credentialResponse.credential) {
      localStorage.setItem('token', JSON.stringify(credentialResponse.credential));
      navigate("/dashboard");
    }
  };

  const [isActive, setActive] = useState(false)
  const [userDetail, setUserDetail] = useState({})
  const [isResponseSuccessful, setIsResponseSuccessful] = useState(false)
  const [alert, setAlert] = useState({})

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard"); // Redirect if token exists
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
        ['expiresInMins']: 30, // optional, defaults to 60
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
                <input type="text" name="username" id="" onChange={handleOnChange} value={userDetail.username} placeholder='Enter User Name' required />
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="inputs mb-4">
                <input type="Password" name="password" id="" onChange={handleOnChange} value={userDetail.password} placeholder='Enter Password' required />
                <i className="fa-solid fa-lock"></i>
              </div>
              <div className='text-center mb-3'>
                <a href="" className='text-decoration-none text-dark'>Forget Password?</a>
              </div>
              <button>Login</button>
            </form>
            <Icons handleGoogleLogin={handleGoogleLogin} />
          </div>
        </div>

        <div className="toggle-box"></div>

        <div className="register-form">
          <div className="login-content">
            <h1 className={`${!isResponseSuccessful ? 'mb-5' : 'mb-3'} display-3 fw-bold`}>SignUp</h1>
            {isResponseSuccessful && <Alert alert={alert} />}

            <form onSubmit={createUser}>
              <div className="inputs mb-4">
                <input type="text" name="username" value={userDetail.username} id="" placeholder='Username' onChange={handleOnChange} required />
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="inputs mb-4">
                <input type="email" name="email" id="" value={userDetail.email} placeholder='Email' onChange={handleOnChange} required />
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="inputs mb-4">
                <input type="Password" name="password" value={userDetail.password} id="" placeholder='Password' onChange={handleOnChange} minLength={8} />
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
    </div>
  )
}
