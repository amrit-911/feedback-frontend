import React from 'react'
import styles from "./title.module.css"
import titleImg from "../../assets/title.png"
export default function Title() {
  return (
    <div className={styles.container}>
        <div className={styles.image}>
            <img src={titleImg} alt="title" />
        </div>
        <div className={styles.title_container}>
            <div>Add your products and give your valuable feedback</div>
          <p>Easily give your feedback in a matter of minutes. Access your audience on all 
            platforms. Observe result manually in real time</p>
        </div>
    </div>
  )
}
