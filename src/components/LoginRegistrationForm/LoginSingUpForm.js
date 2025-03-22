import React, { useState } from 'react'
import Icons from './Icons'
import './style.css'

export default function LoginSingUpForm() {

  const [isActive, setActive] = useState(false)
  const [userDetail, setUserDetail] = useState({})

  const handleOnChange = (event) => {
    setUserDetail({ ...userDetail, [event.target.name]: event.target.value });
  }

  const toggleActive = (event) => {
    const button = event.target
    button.disabled = true
    setActive(!isActive)
    setTimeout(() => { button.disabled = false }, 1000)
  }

  const loginUser = async () => {
    await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userDetail,
        ['expiresInMins']: 30, // optional, defaults to 60
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      });
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
        console.log(data)
      }).catch((error) => console.log(error));
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
            <h1 className='mb-5 display-3 fw-bold'>Login</h1>
            <form onSubmit={createUser}>
              <div className="inputs mb-4">
                <input type="text" name="username" id="" onChange={handleOnChange} value={userDetail.username} placeholder='Enter User Name' />
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="inputs">
                <input type="Password" name="password" id="" onChange={handleOnChange} value={userDetail.password} placeholder='Enter Password' />
                <i className="fa-solid fa-lock"></i>
              </div>
            </form>
            <a href="" className='text-decoration-none m-3 text-dark'>Forget Password?</a>
            <button onClick={loginUser} >Login</button>
            <p className='mt-3 mb-2'>Login with socail media platforms</p>
            <Icons />
          </div>
        </div>
        <div className="toggle-box"></div>

        <div className="register-form">
          <div className="login-content">
            <h1 className='mb-5 display-3 fw-bold'>SignUp</h1>
            <form onSubmit={createUser}>
              <div className="inputs mb-4">
                <input type="text" name="username" value={userDetail.username} id="" placeholder='Username' onChange={handleOnChange} />
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="inputs mb-4">
                <input type="email" name="email" id="" value={userDetail.email} placeholder='Email' onChange={handleOnChange} />
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="inputs mb-4">
                <input type="Password" name="password" value={userDetail.password} id="" placeholder='Password' onChange={handleOnChange} minLength={8} required />
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
