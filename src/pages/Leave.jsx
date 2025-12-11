//import Sidebar from "../components/sidebar";


//import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
//import { useNavigate } from 'react-router';
import axios from "axios";
//import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sidebar from '../components/sidebar';
import { useEffect } from 'react';





const Leave = () => {
  const [show, setShow] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [leaveList, setLeaveList] = useState([]);
  const [editId, setEditId] = useState(null);



const handleDelete = (id) => {
  axios.delete(`https://sms-backend-w3z3.onrender.com/leave/${id}`)
    .then(() => {
      setLeaveList(leaveList.filter(item => item._id !== id));
    })
    .catch(err => console.log(err));
};

const handleShowModal = (id) => {
  setEditId(id);
  setShow(true);

  const item = leaveList.find(x => x._id === id);

  setStudentName(item.studentname);      // ✔ ঠিক key
  setDepartmentName(item.departmentname); // ✔ ঠিক key
  setStudentId(item.studentid);          // ✔ ঠিক key
};


// const handleSubmit = () => {

//   if (editId) {
//     // UPDATE
//     axios.put(`https://sms-backend-w3z3.onrender.com/leave/${editId}`, {
//        studentname: studentName,       // <-- lowercase key
//       departmentname: departmentName, // <-- lowercase key
//       studentid: studentId       
//     }).then(() => {
//       // Updated list refresh
//       axios.get("https://sms-backend-w3z3.onrender.com/leave").then((data) => {
//         setLeaveList(data.data);
//       });

//       // clear edit
//       setEditId(null);
//       setShow(false);
//     });

//   } else {
//     // CREATE
//     axios.post("https://sms-backend-w3z3.onrender.com/leave", {
//       studentName,
//       departmentName,
//       studentId
//     }).then(() => {
//       axios.get("https://sms-backend-w3z3.onrender.com/leave").then((data) => {
//         setLeaveList(data.data);
//       });
//       setShow(false);
//     });
//   }
// };


const handleSubmit = () => {

  if (editId) {
    // UPDATE
    axios.put(`https://sms-backend-w3z3.onrender.com/leave/${editId}`, {
      studentname: studentName,       // <-- lowercase key
      departmentname: departmentName, // <-- lowercase key
      studentid: studentId            // <-- lowercase key
    }).then((res) => {
      // Update state directly instead of GET
      setLeaveList(leaveList.map(item => item._id === editId ? res.data : item));
      setEditId(null);
      setShow(false);
      setStudentName("");
      setDepartmentName("");
      setStudentId("");
    });

  } else {
    // CREATE
    axios.post("https://sms-backend-w3z3.onrender.com/leave", {
      studentname: studentName,       // <-- lowercase key
      departmentname: departmentName, // <-- lowercase key
      studentid: studentId            // <-- lowercase key
    }).then((res) => {
      // Add new leave to state
      setLeaveList([...leaveList, res.data]);
      setShow(false);
      setStudentName("");
      setDepartmentName("");
      setStudentId("");
    });
  }
};




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // let handleSubmit =()=>{
  //   axios.post("https://sms-backend-w3z3.onrender.com/leave",{
  //     studentName: studentName,
  //     departmentName:departmentName,
  //     studentId: studentId
  //   }).then((data)=>{
  //     console.log(data)
  //   })
  // }

 useEffect(()=>{
   axios.get("https://sms-backend-w3z3.onrender.com/leave").then((data)=>{

    setLeaveList(data.data)
   })

 },[])









  return (
    <div className='main'>
      <div className='left'>
      <Sidebar/>
      </div>
      <div className='right'>
        
         <Button variant="primary" onClick={handleShow} className="me-2">
      Create Leave 
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement='bottom' >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Leave</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
             <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setStudentName(e.target.value)}>
        <Form.Label>Student Name</Form.Label>
        {/* <Form.Control  type=" Stuedent Name" placeholder="Enter Name" /> */}
        <Form.Control 
       type="text"
       placeholder='Student Name'
       value={studentName}
      onChange={(e) => setStudentName(e.target.value)}
/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setDepartmentName(e.target.value)} >
        <Form.Label>Department Name</Form.Label>
        {/* <Form.Control type="Department Name" placeholder="Enter Department Name"  /> */}
        <Form.Control 
     type="text"
     placeholder='Department Name'
     value={departmentName}
     onChange={(e) => setDepartmentName(e.target.value)}
/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setStudentId(e.target.value)}>
        <Form.Label>Student Id </Form.Label>
        {/* <Form.Control  type="" placeholder="Enter Student ID"  /> */}
        <Form.Control 
          type="text"
          placeholder='Student ID'
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
/>
      </Form.Group>

     
      
    </Form>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit Leave
      </Button>
        </Offcanvas.Body>
      </Offcanvas>



 {/* Table Start */}


 <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Department</th>
          <th>Student ID</th>
          <th>Total</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
     
     {leaveList.map((item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.studentname}</td>
      <td>{item.departmentname}</td>
      <td>{item.studentid}</td>
      <td>{item.total}</td>
      
      <td>
        <Button variant="primary"onClick={()=>handleShowModal(item._id)}>Edit</Button>
        <Button variant="danger" onClick={()=> handleDelete(item._id)}>Delete</Button>
      </td>
    </tr>
  ))}

       
        
      </tbody>
    </Table>


        
         </div>
         
      </div>
  );
};



export default Leave;