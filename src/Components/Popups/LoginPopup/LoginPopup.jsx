import React, { useState } from 'react'
import email from "../../../assets/Register/email.png"
import password from "../../../assets/Register/password.png"
import styles from "./LoginPopup.module.css"
export default function LoginPopup({setTrigger}) {
 
    const [registration,setRegistration]= useState({ email:"",password:"" , valid:true})
    const[error,setError] = useState(false)
    const [data,setData] = useState()
  
    const changeHandler = (e)=>{
      setRegistration({...registration,[e.target.name]:e.target.value.trim(),valid:true})
       
    }
    const postData = async ()=>{
      try{
      let {   email, password  } = registration;
        
       if( email&&password ){
      
      const res = await fetch("https://feedback-backend-amrit-911.onrender.com/api/login",{ 
        method:"POST",  
      headers:{
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
           email, password 
        })
      })
      const data = await res.json()
      setData(data)
 
      if(!data.err){
        setTrigger({popLogin:false})
      localStorage.setItem("name",data.name)
      localStorage.setItem("email",data.email)  
      localStorage.setItem("token",data.token)
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
    const navigateToSignUp =()=>{
        setTrigger({popLogin:false,popSignUp:true})
    }
    const onSubmit = (e)=>{
      e.preventDefault()
    }
    return (
        <div className={styles.popup}>
      <div className={styles.container}>
      <div className={styles.left}>
      <div className={styles.h1}>Login to continue...</div> 
        <form method="POST" onSubmit={onSubmit}>
        <div className={styles.register_container}>
   
  
          <div className={styles.input_container}>
              <img src={email} alt="usernameImg" className={styles.register_icon} />
              <input type="text" name='email' autoComplete='username' placeholder='Email' onChange={changeHandler} value={registration.email} className={`${styles.input}`} />
            {error&&registration.valid&&!registration.email?<div>Fields are incomplete</div>:""}
          </div>

          <div className={styles.input_container}> 
              <img src={password} alt="passwordImg" className={styles.register_icon} />
              <input type="password" autoComplete='current-password' name='password' placeholder='Password' onChange={changeHandler} value={registration.password} className={`${styles.input}`} />
            {error&&registration.valid&&!registration.password?<div>Fields are incomplete</div>:""}
          </div>
          <div style={{marginLeft:"40px",display:'flex',marginTop:"20px"}}>Don’t have an account?<div style={{cursor:"pointer",marginLeft:"10px",color:"#36416A",textDecoration:"underline"}} onClick={navigateToSignUp}>Sign up</div></div>
          <div className={`${styles.submit_button}`}  onClick={postData}>Log in</div>
          {data?<div>{data.err?<div>Invalid Details</div>:""}</div>:""}
        </div>
        </form>
      </div>
      <div className={styles.right}><div className={styles.cross} onClick={()=>setTrigger({popLogin:false})}>x</div>

<div className={styles.title}>
  <div>
  <div className={styles.brand}>Feedback</div>
  <div className={styles.para}>Add your product and rate other items..........</div>
  </div>
</div></div>
      </div></div>
  )
}
