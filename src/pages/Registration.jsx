import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router';
import axios from "axios"
import { useNavigate } from 'react-router';
import { FaRegEye,FaRegEyeSlash} from "react-icons/fa";
//import { Link, useNavigate } from "react-router";



const Registration = () => {
  let navigate = useNavigate()
  let [userName,setUserName] = useState ("")
  let [email, setEmail] = useState ("")
  let [password, setPassword] = useState ("")

  let [userNameError,setUserNameError] = useState ("")
  let [emailError,setEmailError] = useState ("")
  let [passwordError,setPasswordError] = useState ("")
  let [show,setShow] = useState(false)


  let handleUserNameChange = (e)=>{
    setUserName(e.target.value)
    setUserNameError("")
  }

   let handleEmailChange = (e)=>{
    setEmail(e.target.value)
    setEmailError("")
  }


   let handlePasswordChange = (e)=>{
    setPassword(e.target.value)
    setPasswordError("")
  }

// let handleFormSubmit = (e)=>{
//     e.preventDefault()
//      const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
     

//     if(!userName){
//       setUserNameError("Username required")
//     }
//     if(!email){
//       setEmailError("Email required")
//     }
//     if(!emailRegex.test(email)){
//       setEmailError("please enter a valid email")
//     }
   
//     if(!password){
//       setPasswordError("Password required")
//     }
//   }
//   if(userName && email && password){
//     axios.post("https://sms-backend-w3z3.onrender.com/registration",{
//        username: userName,
//       email: email,
//       password: password
//     }).then((data)=>{
//         console.log(data)
//         navigate("/login")
        
//     }) 
//   }

let handleFormSubmit = (e)=>{
  e.preventDefault()

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  let isValid = true;

  if(!userName){
    setUserNameError("Username required")
    isValid = false
  }
  if(!email){
    setEmailError("Email required")
    isValid = false
  }
  else if(!emailRegex.test(email)){
    setEmailError("Please enter a valid email")
    isValid = false
  }

  if(!password){
    setPasswordError("Password required")
    isValid = false
  }

  if(!isValid) return;

  axios.post("https://sms-backend-w3z3.onrender.com/registration",{
    username: userName,
    email: email,
    password: password
  }).then(()=>{
    navigate("/login")
  })
}










  useEffect(()=>{
     let data = localStorage.getItem("userInfo")
     if(data){
      navigate("/student")
     }
},[])








    return(
         <div className='registration'>

            <div className='imgholder'>
           
                <img src="images/fci logo.png" alt="" />
                
            </div>
            <Container>
            <Form onSubmit={handleFormSubmit}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control onChange={handleUserNameChange} type="text" placeholder="Enter username" />
      </Form.Group>

        {
          userNameError &&
          <Alert key="danger" variant="danger">
          {userNameError}
         </Alert>
        }
        


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={handleEmailChange} type="email" placeholder="Enter email" />
         
         {
          emailError &&
          <Alert key="danger" variant="danger">
          {emailError}
         </Alert>
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
       <div onClick={()=>setShow(!show)}>
          {show
        
        ?
         <FaRegEye/>

        :
        <FaRegEyeSlash />
        
      }

       </div>

        <Form.Control onChange={handlePasswordChange} type= {show ? "text" : "password"} placeholder="Password" />
           {
          passwordError &&
          <Alert key="danger" variant="danger">
          {passwordError}
         </Alert>
        }
      </Form.Group>

    
      <Button onClick={handleFormSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
         <Alert key="warning" variant="warning">
          Already have an account? <Link to="/login">Login</Link>
        </Alert>
       

         </Container>

         </div>
    )
}



export default Registration