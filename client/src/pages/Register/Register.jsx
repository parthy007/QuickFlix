import './Register.scss'
import { useRef, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import rootUrl from "../../api";
import Quick from "../../assets/Quick.png";
import Flix from "../../assets/flix.png";

const Register = () => {

    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ username, setUsername] = useState("");
    const navigate = useNavigate();

    const emailRef = useRef();

    const handleStart = () => {
        setEmail(emailRef.current.value);
    }
    const handleFinish = async(e) => {
        e.preventDefault();
        try{
            await fetch(`${rootUrl}/auth/register`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,username,password})
            });
            navigate("/login");
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='register'>
        <div className="top">
            <div className="wrapper">
                <span className="logo">
                    <img src={Quick} alt="Quickflix Icon" />
                    <img src={Flix} alt="Quickflix Icon" />
                </span>
                <Link to="/login">
                    <button className='loginButton'>Sign In</button>
                </Link>
            </div>
        </div>
        <div className="container">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p> Ready to watch? Enter your email to create or restart your membership.</p>
            { !email ? (
            <div className="input">
                <input type="email" placeholder='Email Address' ref={emailRef} />
                <button className='registerButton' onClick={handleStart}>Get Started</button>
            </div>

            ) : (
            <form className="input">
                <input type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)} />
                <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
                <button className='registerButton' onClick={handleFinish} disabled={!username || !password}>Start</button>
            </form>

            )}
        </div>
    </div>
  )
}

export default Register
