import React, { useEffect, useState } from 'react'
import styles from "./card.module.css"
import commentButtonImg from "../../assets/commentButton.png"
import commentIcon from "../../assets/comentIcon.png"
import sendIcon from "../../assets/sendIcon.png"
import select from "../../assets/select.png"
import axios from 'axios'
export default function Card({id,comapnyName,description,category,upvote,comments,logged,setTrigger,productLink}) {
    const  [commentNumber, setCommentNumber] =useState(comments.length)
    const [incVote,setIncvote] = useState(upvote)
    const [clickComment , setClickComment] = useState(false)
    const [commentArray,setCommentArray] = useState(comments)
    const [addComment,setAddComment] = useState("")

    const clickVote = (comId)=>{
        if(comId === id){
        setIncvote(incVote + 1)
    } 
    }
    
    const commentChange = (e) =>{
            setAddComment(e.target.value)
    }

    const sendClick = (sendID) => {
        if(addComment.trim() === ""){
            setAddComment("")
    }else if(sendID === id) {
        setCommentArray([...commentArray,addComment])
        setAddComment("")
        setCommentNumber(commentNumber + 1)
    }}
    
    const upvoteApi = async (cid) =>{
        try{
              await axios.post(`https://feedback-backend-amrit-911.onrender.com/api/products/${cid}/upvote` , {
              "upvote": incVote
            })
             
        }catch(err){
          console.log(`Error occured: ${err}`)
      }
      }
      const commentNumberApi = async (cid) =>{
        try{
             await axios.post(`https://feedback-backend-amrit-911.onrender.com/api/products/${cid}/comment-number` , {
              "commentNumber": commentNumber
            })
        }catch(err){
          console.log(`Error occured: ${err}`)
      }
      }
      
    const commentApi = async (cid)=>{
        try{
            await axios.post(`https://feedback-backend-amrit-911.onrender.com/api/products/${cid}/addcomment`,{
                "comments": commentArray
            })
        }catch(err){
            console.log(`Error occured: ${err}`)
        }
    }

    const clickToOpenComment = ()=>{
        setClickComment(true)
    }

    useEffect(() => {
        upvoteApi(id)
        commentApi(id)
        commentNumberApi(id)
      })

     
  return (
     
    <div className={styles.container}> 
        <div style={{display:"flex"}}>
        <div className={styles.logo}>
            <img style={{width:"50px",margin:"5px 0 0 3px"}} src={productLink} alt="" />
        </div>
        <div className={styles.details}>
            <div className={styles.head}>{comapnyName}</div>
            <div className={styles.para}>{description}</div>
            <div style={{display:"flex",alignItems:"center"}}>
            <div className={styles.category_conatiner}  >{category.map((item,index)=>
                <div key={index} className={styles.category}>{item}</div>
                  )}
            </div>
            <div onClick={clickToOpenComment} className = {styles.commentButton}><img className={styles.comment_image} src={commentButtonImg} alt="" />comments</div>
            {logged?.profile?<div className={styles.edit_button}><button onClick={()=>setTrigger({popEdit:true,popId:id})}>Edit</button></div>:""}

        </div>
        </div>
        <div className={styles.ability}>
            <div onClick={()=>clickVote(id)} className={styles.upvote}>
                <div><img className={styles.select_image} src={select} alt="" /></div>
                <div>{incVote}</div>
            </div>
            <div className={styles.commentCount}>{commentNumber}<img style={{width:"12px",margin:"0 5px"}} src={commentIcon} alt="" /></div>
        </div>
        </div> 
    {clickComment?<div className={styles.comment_contianer}>
    <div className={styles.comment_section}>
        <textarea placeholder='Add a comment....' onChange={commentChange} value={addComment} name="comment" ></textarea>
        <div className={styles.send_button} onClick={()=>sendClick(id)}><img className={styles.send_image} src={sendIcon} alt="sendicon" /></div>
    </div>
    <div className={styles.comments}>
        <div>{commentArray.slice(0).reverse().map((item,index)=> <ul  key={index}><li>{item}</li></ul> )}</div>
    </div></div>:""}
    </div>
  )
}
