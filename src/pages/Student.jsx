import Sidebar from "../components/sidebar";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from "react";





const Student = () => {
 let navigate = useNavigate()
const [show, setShow] = useState(false);
const [studentname, setStudentName] = useState("");
const [departmentname, setDepartmentName] = useState("");
const [studentid, setStudentId] = useState("");
const [phonenumber, setPhoneNumber] = useState("");
//const [loading, setLoading] = useState("false");
const [studentList, setStudentList] = useState([]);
let [Update,setUpdate] = useState(false)
let [searchList,setSearchList] = useState ([])





const handleCloseForUpdate = () => {
  console.log("hello",studentid)
   //setLoading(true);
   axios.patch(`https://sms-backend-w3z3.onrender.com/student/${studentid}`, {
      studentname: studentname,
      departmentname: departmentname,
      studentid: studentid,
     phonenumber: phonenumber

     }).then(()=>{
     axios.get("https://sms-backend-w3z3.onrender.com/allstudent").then((data)=>{
     console.log("Student Data:", data.data);
    
        //setLoading(false);
        setShow(false);
        setStudentList(data.data);
  });
    
    });
   
  };






  const handleClose = () => {
   // setLoading(true);
    axios.post("https://sms-backend-w3z3.onrender.com/createstudent", {
      studentname: studentname,
      departmentname: departmentname,
      studentid: studentid,
      phonenumber: phonenumber

    }).then(()=>{
     axios.get("https://sms-backend-w3z3.onrender.com/allstudent").then((data)=>{
     console.log("Student Data:", data.data);
    
        //setLoading(false);
         setShow(false);
         setStudentList(data.data);
  });
    
    });
   
  };


const handleCloseModal = () => {
   
 setShow(false);
 setUpdate(false)
   
  };

  const handleShow = () => {
      setDepartmentName("")
      setPhoneNumber("")
      setStudentId("")
      setStudentName("")
     setShow(true)
  };
  const handleShowModal = (id) =>{
    setUpdate(true)
   // console.log(id)
    axios.get(`https://sms-backend-w3z3.onrender.com/student/${id}`).then((data)=>{
      console.log(data.data[0])
      setDepartmentName(data.data[0].departmentname)
      setPhoneNumber(data.data[0].phonenumber)
      setStudentId(data.data[0].studentid)
      setStudentName(data.data[0].studentname)
      setStudentId(data.data[0]._id)
    })
    setShow(true)
  };



useEffect(()=>{
    let data = localStorage.getItem("userInfo")

    if(!data){
      navigate("/login")
    }

},[])

useEffect(()=>{
  axios.get("https://sms-backend-w3z3.onrender.com/allstudent").then((data)=>{
     console.log("Student Data:", data.data);
    setStudentList(data.data)
  })
},[])

let handleDelete = (id)=>{
  console.log("Deleting:", id);
  axios.post("https://sms-backend-w3z3.onrender.com/delete",{ id })
  .then(()=>{
 axios.get("https://sms-backend-w3z3.onrender.com/allstudent").then((data)=>{
     console.log("Student Data:", data.data);
    setStudentList(data.data);
     
  });
  })
}


let handleSearch = (e) => {
  let newArr = []
  studentList.map(item =>{
   if (item.studentname == e.target.value){
    console.log(item.studentname)
    newArr.push(item)
   }
 
  });
  setSearchList(newArr)
};


  return (
    <div className='main'>
      <div className='left'>
      <Sidebar/>
      </div>
      <div className='right'>
         <Button variant="primary" onClick={handleShow}>
        Add Student
      </Button>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Student Name</Form.Label>
        <Form.Control onChange={(e)=>setStudentName(e.target.value)} type=" Stuedent Name" placeholder="Enter Name"
           value={studentname}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Department Name</Form.Label>
        <Form.Control onChange={(e)=>setDepartmentName(e.target.value)} type="Department Name" placeholder="Enter Department Name" value={departmentname} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Student Id </Form.Label>
        <Form.Control onChange={(e)=>setStudentId(e.target.value)} type="" placeholder="Enter Student ID" value={studentid} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control onChange={(e)=>setPhoneNumber(e.target.value)} type="email" placeholder="Enter Number" value={phonenumber} />
      </Form.Group>

      
    </Form>
        </Modal.Body>
        <Modal.Footer>
            {Update
                ?
                <Button  variant="primary" onClick={()=>handleCloseForUpdate()}>
             Update Student 
           </Button>

                :
                <Button variant="primary" onClick={handleClose}>
             Create Student
           </Button>
            }
       </Modal.Footer>
      </Modal>

     

<Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label></Form.Label>
        <Form.Control 
         onChange={handleSearch} 
        type="text"
         placeholder="Search" />
          
      </Form.Group>

      {/* Table Start */}


 <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Department</th>
          <th>Phone Number</th>
          <th>Student ID</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  {searchList.length > 0 ? (
  searchList.map((item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.studentname}</td>
      <td>{item.departmentname}</td>
      <td>{item.phonenumber}</td>
      <td>{item.studentid}</td>
      <td>
        <Button variant="primary" onClick={() => handleShowModal(item._id)}>Edit</Button>
        <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
      </td>
    </tr>
  ))
) : (
  studentList.map((item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.studentname}</td>
      <td>{item.departmentname}</td>
      <td>{item.phonenumber}</td>
      <td>{item.studentid}</td>
      <td>
        <Button variant="primary" onClick={() => handleShowModal(item._id)}>Edit</Button>
        <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
      </td>
    </tr>
  ))
)} 
        
      </tbody>
    </Table>




      </div>
    </div>
  )
}

export default Student