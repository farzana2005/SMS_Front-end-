import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Sidebar from '../components/sidebar';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { useEffect } from 'react';

const Payment = () => {

  let [message, setMessage] = useState("")
  let [amount, setAmount] = useState(0)

let handlePayment =()=>{
   axios.post("http://localhost:5000/payment",{
    amount: 100,
    studentname: JSON.parse(localStorage.getItem("userInfo")).username
    
   }).then((data)=>{
    if(data.data.message){
      setMessage(data.data.message)
      return
    }
    window.location.href = data.data.payment_url
   })
}

useEffect(()=>{
   axios.get("http://localhost:5000/duepayment",).then((data)=>{
      setAmount(data.data)
    
   })
},[])


  return (
    

    <div className='main'>
      <div className='left'>
      <Sidebar/>
      </div>
      <div className='right'> 
        <h1>{message}</h1>
        <Alert  variant="info">
        Your Payment Amount Is {amount} TK
        </Alert>
         <Button variant="primary" onClick={handlePayment}>Make Payment</Button>
      </div>
      </div>

  )
}

export default Payment
