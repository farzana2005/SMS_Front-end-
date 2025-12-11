import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router';
import axios from "axios"
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { FaRegEye,FaRegEyeSlash} from "react-icons/fa";




const Login = () => {

  let navigate = useNavigate()
  let [email, setEmail] = useState ("")
  let [password, setPassword] = useState ("")
  let [emailError,setEmailError] = useState ("")
  let [passwordError,setPasswordError] = useState ("")
   let [message,setMessage] = useState ("")
   const [show, setShow] = useState(false);



  
   let handleEmailChange = (e)=>{
    setEmail(e.target.value)
    setEmailError("")
  }


   let handlePasswordChange = (e)=>{
    setPassword(e.target.value)
    setPasswordError("")
  }

  let handleFormSubmit = (e)=>{
    e.preventDefault()
   
    if(!email){
      setEmailError("Email required")
    }
    if(!password){
      setPasswordError("Password required")
    }

 if( email && password){
    axios.post("http://localhost:5000/login",{
      
      email: email,
      password: password
    }).then((data)=>{
        console.log(data.data)


        if(typeof data.data == "string"){
          setMessage(data.data)
        }else{
          localStorage.setItem("userInfo",JSON.stringify(data.data))
          navigate("/student")
        }
    })
  }

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
            {message &&
            <h1>{message}</h1>
            }



            <Form>
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

      {/* <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>

        <Form.Control onChange={handlePasswordChange} type="password" placeholder="Password" />
           {
          passwordError &&
          <Alert key="danger" variant="danger">
          {passwordError}
         </Alert>
        }
      </Form.Group> */}



      <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>

  <div style={{ position: "relative" }}>
    <Form.Control
      onChange={handlePasswordChange}
      type={show ? "password" : "text"}
      placeholder="Password"
    />

    <span
      onClick={() => setShow(!show)}
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer"
      }}
    >
      {show ? <FaRegEyeSlash /> : <FaRegEye />}
    </span>
  </div>

  {passwordError && (
    <Alert key="danger" variant="danger">
      {passwordError}
    </Alert>
  )}
</Form.Group>


    
      <Button onClick={handleFormSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
            <Alert key="warning" variant="warning">
          Don't  have an account? <Link to="/registration">Registration</Link>
        </Alert>
        

         </Container>

         </div>
    )
}



export default Login