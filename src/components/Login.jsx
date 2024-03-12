import React , {useState , useRef , useEffect} from 'react';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineVerified } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import useAuth from '../context.js/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../CustomHooks/useLocalStorage';

function Login() {
  // custom hook
  const {setItem } = useLocalStorage('refer');
  const [Translate , setTranslate] = useState(false);
  const [isActive,setisActive] =useState(false);
  const nameRef = useRef();
  const passRef = useRef();
  const confPass = useRef();
  const signInName = useRef();
  const signInPass = useRef();
  const {AuthPopup,CreateUser , SignIn , loading ,valid , setvalid } = useAuth();
  var navigate = useNavigate();
  
  // re-direction to home page after login using google is successfull
  useEffect(()=>{
    if(loading){navigate('/')}
    else {
      console.log('done')
    }
    return ()=>{
      console.log('STATUS'+':'+'component get unmounted')
    }
  },[loading])
  function LoginUsingNP(e){
      e.preventDefault();
      let name = signInName.current.value;
      let password = signInPass.current.value;
      if(name!=='' && password.length>6){
        SignIn(name,password)
      }
      else{
        alert('Enter a valid mail id or password')
      }
  }
  function SignUp(e){
    e.preventDefault();
    setItem(nameRef.current.value)
    let name = nameRef.current.value;
    let password = passRef.current.value;
    let confirmpass = confPass.current.value;
    if(name !== ''&&password.length > 6 && confirmpass === password ){
      CreateUser(name,password);
    }
    else{alert('password miss match')};
  }
  function LoginUsingGoogle(){
    AuthPopup();
    

  }
  function Swapper(e){
    e.preventDefault();
    if(window.innerWidth > 600){
      setisActive(!isActive)
    }
    else{
      setTranslate(!Translate)
    }
  }
  return (
    <div className='login'>
      <div className={`logpad ${isActive ? 'withbeforepseudoclass' : ''}`}>
        <form  className={`signup ${Translate ? 'translate' : ''}`}>
          <div className="headup">
            <h1>Create Your account</h1>
          </div>
          <div className="upauth">
            <div className="google" onClick={LoginUsingGoogle}>
              <FcGoogle className='authic'/>
              <p>sign in with google</p>
            </div>
            <div className="face">
              <FaFacebook className='authic'/>
            </div>
          </div>
          <div className="updash">
            <div id="pseudosi"></div>
            <p>or use your email account</p>
            <div id="pseudosi"></div>
          </div>
          <input 
            className='pana' 
            type="text" 
            ref={nameRef} 
            placeholder='Name' 
            
          />
          <input 
            className='pana' 
            type="password"
            ref={passRef}
            placeholder='Password'

           />
          <input 
            className='pana' 
            type="password" 
            ref={confPass}
            placeholder='Re-type password'  
          />
          <div className="checkbox">
           <input type="checkbox" className='check'/>
            <button className='swap' onClick={Swapper}>Already Have An Account?</button>
          </div>
          <div className="butt">
            <button className='hirebut' onClick={SignUp}>Sign Up</button>
          </div>
        </form>
        <form className={`signin ${Translate ? 'translate' : ''}`}>
        <div className="headup">
            <h1>Sign in to your account</h1>
          </div>
          <div className="upauth">
          <div className="google" onClick={LoginUsingGoogle}>
              <FcGoogle className='authic'/>
              <p>sign in with google</p>
            </div>
            <div className="face">
              <FaFacebook className='authic'/>
            </div>
          </div>
          <div className="updash">
            <div id="pseudosi"></div>
            <p>or use your email account</p>
            <div id="pseudosi"></div>
          </div>
          <input 
            className='pana' 
            type="text" 
            ref={signInName}
            placeholder='Enter mail id'
          />
          <input 
            className='pana' 
            type="password" 
            ref={signInPass}
            placeholder='password'
          />
          <div className="checkbox">
           <input type="checkbox" className='check'/>
            <button  className='swap' onClick={Swapper}>Create Your Account !</button>
          </div>
          <div className="butt">
            <button className='hirebut' onClick={LoginUsingNP}>Sign In</button>
          </div>
        </form>
      </div>
      {valid ? 
        <div className="overlay">
        <div className="overcard">
          <div className="close"><IoCloseOutline id='closeic'onClick={()=>{setvalid(!valid)}}/></div>
          <div className="msg">
              <div className="succesic"><MdOutlineVerified id='suc'/></div>
              <h6>Sign Up Successfull</h6>
              <p>Thank you for signing up with us!</p>
          </div>
        </div>
      </div> 
      :
      ""
    }
      
    </div>
  )
}

export default Login