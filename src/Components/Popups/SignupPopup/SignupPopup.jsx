import React, {   useState } from 'react'
import styles from "./SignupPopup.module.css"
 
import mobile from "../../../assets/Register/mobile.png"
import name from "../../../assets/Register/name.png"

import email from "../../../assets/Register/email.png"
import password from "../../../assets/Register/password.png"
export default function SignupPopup({setTrigger}) {
    
    const [registration,setRegistration]= useState({name:"",email:"",password:"",mobile:"", valid:true})
    const[error,setError] = useState(false)
    const [alreadyRegistered,setAlreadyRegistered] = useState()
  
    const changeHandler = (e)=>{
      setRegistration({...registration,[e.target.name]:e.target.value.trim(),valid:true})
    }
    const postData = async ()=>{ 
      try{
      let { name, email, password, mobile } = registration;
        
       if(name&&email&&password&& mobile &&mobile.length === 10){
      const res = await fetch("https://feedback-backend-amrit-911.onrender.com/api/register",{
        method:"POST",  
      headers:{
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name, email, password, mobile 
        })
      })
      const data = await res.json()
 
      if(data === "Already registered"){
        setAlreadyRegistered("Already Registered")
      }else{
      localStorage.setItem("name",data.name)
      localStorage.setItem("email",data.email)
      localStorage.setItem("token",data.token)
      setTrigger({popSignUp:false})
      window.location.reload(false);
      }
    }else{
      setError(true)
      setRegistration({...registration,valid:true})
      console.log("Fields are incomplete")
    }
    }catch(err){
      console.log("Error occured :",err)
    }
    }
    const navigateToLogin =()=>{
       setTrigger({popSignUp:false,popLogin:true})
    }
    const onSubmit = (e)=>{
      e.preventDefault()
    }
    return (
        <div className={styles.popup}>
      <div className={styles.container}>
        <div className={styles.left}>
        <div className={styles.h1}>Signup to continue...</div> 
        <form method="POST" onSubmit={onSubmit}>
        <div className={styles.register_container}>
          <div className={styles.input_container}>
              <img src={name} alt="username"  className={styles.register_icon}/>
              <input type="text" name='name' placeholder='Name' onChange={changeHandler} value={registration.name} className={`${styles.input}`} />
              {error&&registration.valid&&!registration.name?<div>Enter your name</div>:""}
          </div>
  
          <div className={styles.input_container}>
              <img src={email} alt="username" className={styles.register_icon} />
              <input type="text" name='email' placeholder='Email' onChange={changeHandler} value={registration.email} className={`${styles.input}`} />
            {error&&registration.valid&&!registration.email?<div>Enter your email</div>:""}
  
          </div>
  
          <div className={styles.input_container}>
              <img src={mobile} alt="username"  className={styles.register_icon}/>
              <input type="text" name='mobile' maxLength="10" placeholder='Mobile Number'onChange={changeHandler} value={registration.mobile}  className={`${styles.input}`}  />
            {error&&registration.valid&&registration.mobile<=1000000000?<div>Enter your mobile number</div>:""}
  
          </div>
          
          <div className={styles.input_container}> 
              <img src={password} alt="username" className={styles.register_icon} />
              <input type="password" autoComplete='current-password' name='password' placeholder='Password' onChange={changeHandler} value={registration.password} className={`${styles.input}`} />
            {error&&registration.valid&&!registration.password?<div>Enter your password</div>:""}
          </div>
          <div style={{marginLeft:"40px",display:'flex',marginTop:"20px"}}>Already have an account? <div style={{cursor:"pointer",marginLeft:"10px",color:"#36416A",textDecoration:"underline"}} onClick={navigateToLogin}>Log in</div></div>
        <div className={`${styles.submit_button}`}  onClick={postData}>Sign up</div>
          {alreadyRegistered?<div>Already Registered</div>:""}
        </div>
        </form> 
        </div>
        <div className={styles.right}><div className={styles.cross} onClick={()=>setTrigger({popSignUp:false})}>x</div>

<div className={styles.title}>
  <div>
  <div className={styles.brand}>Feedback</div>
  <div className={styles.para}>Add your product and rate other items..........</div>
  </div>
</div></div>
      </div></div>
  )
}
