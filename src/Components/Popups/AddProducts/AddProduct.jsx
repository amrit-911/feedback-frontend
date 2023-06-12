import React, { useState } from 'react'
import styles from "./AddProduct.module.css"
export default function AddProduct({chooseProduct,setTrigger}) {
    const [newProduct,setNewProduct] = useState({comapnyName:"",category:"",logoUrl:"",productLink:"",description:"",comments:[],commentNumber:0,upvote:0, valid:true})
    const[error,setError] = useState(false)
     const [selected,isSelected] = useState( )
      

    const changeHandler = (e)=>{
      setNewProduct({...newProduct,[e.target.name]:e.target.value})
      isSelected(newProduct.comapnyName)
    }
     
    const onSubmit = (e) =>{
      e.preventDefault()
    }
    const postData = async ()=>{ 
      try{
      let { comapnyName,category,logoUrl,productLink,description,comments, commentNumber,upvote} = newProduct;
       let  catArray = category.split(",")
       //.replace(/\s/g, "")
       if(comapnyName.replace(/\s/g, "").length>0&&catArray && logoUrl.replace(/\s/g, "").length>0 && productLink.replace(/\s/g, "").length>0 && description.replace(/\s/g, "").length>0 ){
      const res = await fetch("https://feedback-backend-amrit-911.onrender.com/api/products/new",{
        method:"POST",  
      headers:{
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          comapnyName,category: catArray , logoUrl , productLink , description , comments , commentNumber , upvote 
        })
      })
      const data = await res.json()
 
      chooseProduct(selected)
      setTrigger({popAddProduct:false})
    }else{
      setError(true)
      setNewProduct({...newProduct,valid:true})
      console.log("Fields are incomplete")
    }
    }catch(err){
      console.log("Error occured :",err)
    }
    }
     const closePopup =()=>{
       setTrigger({popAddProduct:false})
     }
 
  return (
     <div className={styles.popup}>
      <div className={styles.container}>

      <div className={styles.left}>
        
          <div className={styles.h1}>Add your product</div> 

          <form method="POST" onSubmit={onSubmit}>
            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='comapnyName' placeholder='Name of the company' onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.comapnyName?<div>Fileds are incomplete</div>:""}

            </div>

            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='category' placeholder='Category (place comma after each category)' onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.category?<div>Fileds are incomplete</div>:""}

            </div>

            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='logoUrl' placeholder='Add logo url' onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.logoUrl?<div>Fileds are incomplete</div>:""}

            </div>

            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='productLink' placeholder='Link of product' onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.productLink?<div>Fileds are incomplete</div>:""}

            </div>
            <div className={styles.input_container}>
              <input className={styles.input} type="text" name='description' placeholder='Add description' onChange={changeHandler}/>
            {error&&newProduct.valid&&!newProduct.description?<div>Fileds are incomplete</div>:""}

            </div>
            <div className={styles.submit_button} onClick={postData}>+ Add</div>
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
