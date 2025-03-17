import React, { useState } from 'react'
import './style.css'

export default function LoginSingUpForm() {

  const [isActive, setActive] = useState(false)

  const registerBtn = () => {
    setActive(true)
  }

  const loginBtn = () => {
    setActive(false)
  }

  const user = { username: 'john_doe', email: 'john@example.com', password: 'pass123' };
  fetch('https://fakestoreapi.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => console.log(data));


  return (
    <div className={`wapper-box ${isActive ? 'active' : ''} shadow`} >

      <div className="dont-acc">
        <h1 className='text-white display-5 fw-bold '>Hello Welcome!</h1>
        <p className='text-white fs-4 fw-medium'>Don't have an account?</p>
        <button className='dont-acc-btn ' onClick={registerBtn}>Register</button>
      </div>


      <div className="login-form">
        <div className="login-content">
          <h1 className='mb-5 display-3 fw-bold'>Login</h1>
          <div className="inputs mb-4">
            <input type="text" name="" id="" placeholder='Email' />
            <i class="fa-solid fa-user"></i>
          </div>
          <div className="inputs">
            <input type="Password" name="" id="" placeholder='Password' />
            <i class="fa-solid fa-lock"></i>
          </div>
          <a href="" className='text-decoration-none m-3 text-dark'>Forget Password?</a>
          <button >Login</button>
          <p className='mt-3 mb-2'>Login with socail media platforms</p>
          <div className="socail-media-icons">
            <i class="fa-brands fa-google"></i>
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-github"></i>
            <i class="fa-brands fa-linkedin-in"></i>
          </div>
        </div>
      </div>
      <div className="toggle-box"></div>

      <div className="register-form">
        <div className="login-content">
          <h1 className='mb-5 display-3 fw-bold'>SignUp</h1>
          <div className="inputs mb-4">
            <input type="text" name="" id="" placeholder='Username' />
            <i class="fa-solid fa-user"></i>
          </div>
          <div className="inputs mb-4">
            <input type="Password" name="" id="" placeholder='Email' />
            <i class="fa-solid fa-envelope"></i>
          </div>
          <div className="inputs mb-4">
            <input type="Password" name="" id="" placeholder='Password' />
            <i class="fa-solid fa-lock"></i>
          </div>
          <button>SignUp</button>
        </div>
      </div>

      <div className="already-acc">
        <h1 className='text-white display-5 fw-bold '>Hello Welcome!</h1>
        <p className='text-white fs-4 fw-medium'>Already have an account?</p>
        <button className='dont-acc-btn ' onClick={loginBtn}>Login</button>
      </div>

    </div >
  )
}
