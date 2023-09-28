import React from 'react'
import logo from './logo.png'
const UserFormComplete = () => {
  return (
    <>
    <div style ={{display:"flex",marginTop:'100px',height:"220px"}}>
      <div style ={{display:'flex', width:'40%',}}></div>
      <div style ={{display:'flex', width:'20%',}}> <img src={logo} style={{width:'100%',height:'auto'}} alt='img error'></img> 
</div>
      <div style ={{display:'flex', width:'40%',}}></div>      
      </div>
    <div style={{display:"flex",justifyContent:"center", alignItems:"center" ,}}>
      <p><h1>Thank You !!!</h1></p>
    </div>
    <div style={{display:"flex",justifyContent:"center", alignItems:"center" ,}}>
       <p><h6>You have been Sucessfully Filled the Form </h6></p>
    </div>
    </>
  )
}

export default UserFormComplete

  