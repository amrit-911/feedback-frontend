export const authenticateApi = async () =>{
    try{
        const res  = await fetch(`http://localhost:8000/api/user/${verEmail}`,{
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
        console.log(data)
    }catch(err){
        console.log(err)
    }
  }