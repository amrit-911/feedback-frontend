import React, { useEffect, useState } from 'react'
import styles from "./EditPopup.module.css"
export default function EditPopup({setTrigger,editId}) {
    const [newProduct,setNewProduct] = useState({comapnyName:"",category:"",logoUrl:"",productLink:"",description:"",valid:true})
    const[error,setError] = useState(false)

    const changeHandler = (e)=>{
      setNewProduct({...newProduct,[e.target.name]:e.target.value})  
    }
      
    const onSubmit = (e) =>{
      e.preventDefault()
    }

    const getData = async ()=>{
      try{
        const res = await fetch(`https://feedback-backend-amrit-911.onrender.com/api/products/edit/${editId}`,{
        method:"GET",  
      headers:{
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }
      })
      const data = await res.json()
 
      await setNewProduct(data)

    }catch(err){
        console.log("Error occured :",err)
      }}
useEffect(() => {
 getData()
},[setTrigger] )


    const postData = async ()=>{ 
      try{
      let { comapnyName,category,logoUrl,productLink,description,comments, commentNumber,upvote} = newProduct;
       let catArray = category.split(",")
       //.replace(/\s/g, "")  
       if(comapnyName.replace(/\s/g, "").length>0&&catArray && logoUrl.replace(/\s/g, "").length>0 && productLink.replace(/\s/g, "").length>0 && description.replace(/\s/g, "").length>0 ){
      const res = await fetch(`https://feedback-backend-amrit-911.onrender.com/api/products/edit/${editId}`,{
        method:"POST",  
      headers:{
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          comapnyName,category: catArray , logoUrl , productLink , description , comments , commentNumber , upvote 
        })
      })
      const editedData = await res.json()
 
      setTrigger({popEdit:false})
      window.location.reload(false);
    }else{
      setError(true)
      setNewProduct({...newProduct,valid:true})
 
    }
    }catch(err){
      console.log("Error occured :",err)
    }
    }
     const closePopup =()=>{
       setTrigger({popEdit:false})
     }

  return (
     <div className={styles.popup}>
      <div className={styles.container}>

      <div className={styles.left}>
        
          <div className={styles.h1}>Edit your product</div>

          <form method="POST" onSubmit={onSubmit}>
            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='comapnyName' placeholder={newProduct.comapnyName}   onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.comapnyName?<div>Enter your name</div>:""}

            </div>

            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='category' placeholder={newProduct.category}   onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.category?<div>Enter your name</div>:""}

            </div>

            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='logoUrl' placeholder={newProduct.logoUrl}   onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.logoUrl?<div>Enter your name</div>:""}

            </div>

            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='productLink' placeholder={newProduct.productLink}   onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.productLink?<div>Enter your name</div>:""}

            </div>
            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='description' placeholder={newProduct.description}   onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.description?<div>Enter your name</div>:""}

            </div>
            <div className={styles.submit_button} onClick={postData}>Edit</div>
          </form>
      </div>
      <div className={styles.right}>
      <div className={styles.cross} onClick={closePopup}>x</div>

        <div className={styles.title}>
          <div>
          <div className={styles.brand}>Feedback</div>
          <div className={styles.para}>Add your product and rate other items..........</div>
          </div>
        </div>
      </div>
      </div>
    </div> 
  )
}