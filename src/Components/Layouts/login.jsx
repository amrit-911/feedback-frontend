import React, { useState } from 'react'
import { useNavigate } from "react-router"
import styles from "./login.module.css"
import email from "../../assets/Register/email.png"
import password from "../../assets/Register/password.png"


export default function Login() {
  const navigate = useNavigate()
  const [registration,setRegistration]= useState({ email:"",password:"" , valid:true})
  const[error,setError] = useState(false)
  const [data,setData] = useState()
  const [load,setLoad] = useState(false)

  const changeHandler = (e)=>{
    setRegistration({...registration,[e.target.name]:e.target.value.trim(),valid:true})
     
  }
  const postData = async ()=>{
    
    try{
    let {   email, password  } = registration;
      
     if( email&&password ){
      setLoad(true)
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
      navigate("/")
    localStorage.setItem("name",data.name)
    localStorage.setItem("email",data.email)  
    localStorage.setItem("token",data.token)
    }
    setLoad(false)
  }else{
    setError(true)
    setRegistration({...registration,valid:true})
     
  }
  }catch(err){
    console.log("Error occured :",err)
  }
  }
  const navigateToSignUp =()=>{
    navigate("/register")
  }
  const onSubmit = (e)=>{
    e.preventDefault()
  }



  return (
    <div className={styles.body}>
    <div className={styles.container}>
      <form method="POST" onSubmit={onSubmit}>
      <div className={styles.register_container}>
 

        <div className={styles.input_container}>
            <img src={email} alt="usernameImg" className={styles.register_icon} />
            <input type="email" name='email' autoComplete='username' placeholder='Email' onChange={changeHandler} value={registration.email} className={`${styles.input}`} />
          {error&&registration.valid&&!registration.email?<div>Fields are incomplete</div>:""}
        </div>
 
        
        <div className={styles.input_container}> 
            <img src={password} alt="passwordImg" className={styles.register_icon} />
            <input type="password" autoComplete='current-password' name='password' placeholder='Password' onChange={changeHandler} value={registration.password} className={`${styles.input}`} />
          {error&&registration.valid&&!registration.password?<div>Fields are incomplete</div>:""}
        </div>
         
        <div style={{display:'flex'}}>Don’t have an account?<div style={{cursor:"pointer",marginLeft:"10px",color:"#36416A",textDecoration:"underline"}} onClick={navigateToSignUp}>Sign up</div></div> 
        <div className={`${styles.register_button}`} type="submit" onClick={postData}>Log in</div>
        {load?<div>logging in....wait for it</div>:""}
        {data?<div>{data.err?<div>Invalid Details</div>:""}</div>:""}
      </div> 
      </form>
    </div>
  </div>
  )
}
