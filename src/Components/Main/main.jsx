import React, { useEffect, useState } from 'react'
import styles from "./main.module.css"
import Title from './title'
import axios from 'axios'
import Card from './card'
import Navbar from '../Layouts/navbar'
import loading2 from "../../assets/Loading/loading2.gif"
import AddProduct from '../Popups/AddProducts/AddProduct'
import SignupPopup from '../Popups/SignupPopup/SignupPopup'
import LoginPopup from '../Popups/LoginPopup/LoginPopup'
import select from "../../assets/select.png"
import EditPopup from '../Popups/EditPopup/EditPopup'

export default function Main() {
    const [selectedSort,setSelectedSort] = useState()
    const [refresh,setRefresh] = useState()
    const [products,setProducts] = useState()
    const [data,setData] = useState()    
    const token = localStorage.getItem("token")
    const verEmail = localStorage.getItem("email")
    const [profile,setProfile] =useState()
    const [radio, setRadio] = useState("")
    const[open,setOpen] = useState({popAddProduct:false, popSignUp:false,popLogin:false,popEdit:false,popId:""})

    const radioChange = (e) =>{
      setRadio(e.target.value)
    }

    const authenticateApi = async () =>{
      try{
          const res  = await fetch(`https://feedback-backend-amrit-911.onrender.com/api/user/${verEmail}`,{
              method:"POST",  
            headers:{
                "Content-Type": "application/json",
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                 "token" : token
              })
            })
              const data = await res.json()
          setData(data)
          setProfile(data.profile)
          
    
      }catch(err){
          console.log(err)
      }
    }

    
    const chooseSelect = (selectedSort) =>{
      setSelectedSort(selectedSort)
    }
    const chooseProduct = (refresh) =>{
      setRefresh(refresh)
    }
 

  // fetching details
    const fetchApi = async () =>{

      try{
      const res  = await axios.get(`https://feedback-backend-amrit-911.onrender.com/api/products/${selectedSort}?category=${radio}`)
          setProducts(res.data)
 
      }catch(err){
          console.log(err)
      }
    }

    useEffect(() => {
      authenticateApi()
      fetchApi()
      setProducts()
    },[selectedSort,radio,refresh])   
 
    
    const clickAddProduct =()=>{
      if(data?.profile){
        setOpen({popAddProduct:true})
      }else{
        setOpen({popAddProduct:false,popSignUp:true})
      }
    }

  return (
    <div>
      <nav>
        <Navbar data={data} profiles={profile}/>
      </nav>
        <div><Title/></div>
        <div className={styles.main}>
        <div className={styles.filter}>
          <div className={styles.filter_container}>
            <div className={styles.filter_head}> 
             
                <div className={styles.filter_brand}>Feedback</div>
                <div className={styles.filter_para}>Apply filter</div>
              </div>
            <div className={styles.radio_container}>
                <div className={styles.label_div}>
                <label  className={`${styles.radio_label} ${radio === ""?styles.add_bg:""}`} htmlFor="all"><input type="radio" id="all" value="" checked={radio === ""} onChange={radioChange}/>All</label>
              </div>
          {products?
              products.filter.map((item,index)=><div className={styles.label_div} key={index}>
                    <label  className={`${styles.radio_label} ${radio === item?styles.add_bg:""}`} htmlFor={index}><input type="radio" id={index} value={item} checked={radio === item} onChange={radioChange}/>{item}</label>
              </div>):""}
          </div>
        </div>
        </div>

        <div className={styles.suggestion_and_list}>
        <div className={styles.suggestions_tab}>
          <div className={styles.suggestions}>{products?products.product.length:""} Suggestions</div>
          <div className={styles.sort}>
              <div style={{color: "#8B8B8B",marginRight:"10px"}}>sort by:</div>
              <Dropdown chooseSelect={chooseSelect}/>
           </div>
           <div className={styles.add_prodcut} onClick={clickAddProduct}>
              + Add Products
           </div>
        </div>
        {products?<div>{products.product.map((item,index)=><div key={index} ><Card logged={data} id={item._id} productLink = {item.logoUrl} comapnyName = {item.comapnyName} description= {item.description} category= {item.category} upvote={item.upvote} comments = {item.comments} numberOfComments = {item.commentNumber} setTrigger={setOpen} /></div>)}</div>:<div><img  src={loading2} alt="" /></div>}
        </div>


        </div>
        {open.popAddProduct?<AddProduct chooseProduct={chooseProduct} setTrigger = {setOpen}/>:""}
        {open.popSignUp?<SignupPopup setTrigger = {setOpen}/>:""}
        {open.popLogin?<LoginPopup setTrigger = {setOpen}/>:""}
        {open.popEdit?<EditPopup  setTrigger={setOpen} editId = {open.popId}/>:""}
    </div>
  )
}
 
 function Dropdown({chooseSelect}) {
  const [active,setActive] = useState(false)
  const [selected,isSelected] = useState("Upvotes")
  const clickDrop = () =>{
    setActive(!active)
   chooseSelect(selected)
  }

  const clickSelect = (e) => {
   isSelected(e.target.textContent)
   setActive(false)

  }
  useEffect(() => {
    chooseSelect(selected)
  })
  

  return (
    <div className={styles.dropdown}>
        <div className={styles.select} onClick={clickDrop} >{selected} <img className={styles.select_image} src={select}alt="" /> </div>
          {active?<div className={styles.drop}><div className={styles.select_drop} onClick={clickSelect}>Comments</div>
          <div className={styles.select_drop} onClick={clickSelect}>Upvotes</div></div>:""}
    </div>
  )
}
