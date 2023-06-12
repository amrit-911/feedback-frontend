import { useNavigate } from "react-router"
import styles from "./navbar.module.css"
import profile from "../../assets/profile.jpg"
export default function Navbar({data }) {
  const navigate = useNavigate()
   
 
 
const clickToLoginPage =()=>{
    navigate("/login")
}
 const clickToSignUpPage =()=>{
    navigate("/register")
    localStorage.setItem("token","")
    localStorage.setItem("email","")
}
 const clickLogout =()=>{
    navigate("/login") 
    localStorage.setItem("token","")
    localStorage.setItem("email","") 
}
 
 return (
    <div className={styles.container}>
        <div className={styles.brand}>Feedback</div>
        {data?.profile?
        <div style={{display:"flex",alignItems:"center"}}>
            <div className={styles.logout}onClick={clickLogout}>Log out</div>
            <div className={styles.profile}>Hello, {data.profile} </div>
            <div><img className={styles.profile_image} src={profile} alt="" /></div>
        </div> : 
        <div style={{display:"flex",alignItems:"center"}}>
            <div className={styles.login} onClick={clickToLoginPage}>Login</div>
            <div className={styles.signup} onClick={clickToSignUpPage}>Sign up</div>
        </div>}
    </div>
  )
}

 