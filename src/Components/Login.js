import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    const handleBackToLoginClick = () => {
        setShowForgotPassword(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        console.log('Form submitted:', email, password);
        navigate('/home');
    };

    return (
        <div className='background-img'>
            <div className="container-fluid h-100 d-flex">
                <div className="log">
                    <div className="row justify-content-center">
                        <div className="col-md-4 text-center">
                            <img src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="company logo" className='sold' />
                            <p style={{color:'#868686'}}>Welcome To DigitalFlake admin</p>
                        </div>
                    </div>
                    {showForgotPassword ? (
                        <form className="w-100">
                            <div className='layout'>
                                <div className='row justify-content-center'>
                                    <h2 style={{color:'#5C218B'}}>Did You Forget Password?</h2>
                                    <p style={{color:'38F8F8F'}}>Enter your email address and we will send you a link to restore password</p><br /><br />
                                    <div className="form-group mb-3 col-md-10">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className="d-grid gap-2 col-md-10">
                                        <button type="submit" className="btn btn-block" style={{ backgroundColor: '#5C218B', color: 'white' }}>Send Request Link</button>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className="col-md-10 text-center">
                                        <button type="button" className="btn btn-link" onClick={handleBackToLoginClick}>Back to Login</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form className="w-100" onSubmit={handleSubmit}>
                            <div className='layout'>
                                <div className='row justify-content-center'>
                                    <div className="form-group mb-3 col-md-10">
                                        <label htmlFor="username">Email</label>
                                        <input type="email" className="form-control" id="username" value={email} onChange={handleEmailChange} />
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className="form-group mb-3 col-md-10">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                                    </div>
                                </div>
                                <div className='row justify-content-center' id='bts'>
                                    <div className="d-grid gap-2 col-md-10">
                                        <button type="submit" className="btn btn-block" style={{ backgroundColor: '#5C218B', color: 'white' }}>Login</button>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className="col-md-10 text-center">
                                        <button type="button" className="btn btn-link" onClick={handleForgotPasswordClick}>Forgot Password?</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
