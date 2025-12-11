import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from "react-router-dom";


const PDF = () => {
const [show, setShow] = useState(false);

const [name, setName] = useState("");
const [departmentname, setDepartmentName] = useState("");
const [writer, setWriter] = useState("");
const [serial, setSerial] = useState("");
const [file, setFile] = useState("");
let [booklist,setBookList] = useState([]);
// const handleClose = () => {
//   console.log(file);
//   axios.post("https://sms-backend-w3z3.onrender.com/uploadbook",{
//     name:name,
//     departmentname:departmentname,
//     writer:writer,
//     serial:serial,
//     avatar:file
//   }, {
//           headers: {
//             'Content-Type': 'multipart/form-data', 
//           },
//         }
//      );
//    };



// const handleClose = async () => {
//   console.log("Department name:", departmentname);

//   const formData = new FormData();

//   formData.append("name", name);
//   formData.append("departmentname", departmentname);
//   formData.append("writer", writer);
//   formData.append("serial", serial);
//   formData.append("avatar", file);  // file এখানে যাবে

//   try {
//     const res = await axios.post(
//       "https://sms-backend-w3z3.onrender.com/uploadbook",
//       formData
//     );

//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };


// const handleClose = async () => {
//   console.log("Department name:", departmentname);

//   const formData = new FormData();

//   formData.append("name", name);
//   formData.append("departmentname", departmentname);
//   formData.append("writer", writer);
//   formData.append("serial", serial);
//   formData.append("avatar", file);

//   try {
//     const res = await axios.post(
//       "https://sms-backend-w3z3.onrender.com/uploadbook",
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" }
//       }
//     );

//     console.log(res.data);

//     // ✅ Modal বন্ধ করো
//     setShow(false);

//     // ✅ Upload সফল হলে লিস্ট আবার লোড করো
//     axios.get("https://sms-backend-w3z3.onrender.com/allbook").then((data)=>{
//       setBookList(data.data);
//     });

//   } catch (error) {
//     console.log(error);
//   }
// };

const handleClose = async () => {
  console.log("Department name:", departmentname);

  const formData = new FormData();

  formData.append("name", name);
  formData.append("departmentname", departmentname);
  formData.append("writer", writer);
  formData.append("serial", serial);
  formData.append("avatar", file);

  try {
    const res = await axios.post(
      "https://sms-backend-w3z3.onrender.com/uploadbook",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );

    console.log(res.data);

    // ⭐ res.data এর ভিতর নতুন book ডেটা থাকা দরকার
    const newBook = res.data;

    // ⭐ table এ সাথে সাথে দেখানোর জন্য booklist আপডেট:
    setBookList((prev) => [...prev, newBook]);

    //  Modal বন্ধ করো
    setShow(false);

    // Form reset করো
    setName("");
    setDepartmentName("");
    setWriter("");
    setSerial("");
    setFile("");

  } catch (error) {
    console.log(error);
  }
};




const handleShow = () => setShow(true);

let handleChange =(e)=>{
  setFile(e.target.files[0])
};

useEffect(()=>{
axios.get("https://sms-backend-w3z3.onrender.com/allbook").then((data)=>{
   setBookList(data.data);
});
},[]);

  return (
    <div className="main">
      <div className="left">
        <Sidebar/>

      </div>
       <div className="right">
                <Button variant="outline-danger" onClick={handleShow}>
        Add a Book
      </Button>

      <Modal show={show} onHide={() => setShow(false)}  >
        <Modal.Header closeButton>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        {/* <Form.Control type=" Stuedent Name" placeholder="Enter Name"
          
        /> */}
        <Form.Control
  type="text"
  placeholder="Enter Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Department Name</Form.Label>
        {/* <Form.Control  type="Department Name" placeholder="Enter Department Name"  /> */}
        <Form.Control
           type="text"
           placeholder="Enter Department Name"
           value={departmentname}
           onChange={(e) => setDepartmentName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Writer </Form.Label>
        {/* <Form.Control  type="text" placeholder=" Enter Writer"  /> */}

        <Form.Control
         type="text"
         placeholder=" Enter Writer"
         value={writer}
         onChange={(e) => setWriter(e.target.value)}/>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Serial</Form.Label>
        {/* <Form.Control type="email" placeholder="Enter Serial No"  /> */}
           <Form.Control
             type="text"
             placeholder="Enter Serial No"
             value={serial}
            onChange={(e) => setSerial(e.target.value)}/>
      </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Upload</Form.Label>
        <Form.Control onChange={handleChange}  type="file" placeholder="Enter Number"  />
      </Form.Group>

      
    </Form>
        </Modal.Body>
        <Modal.Footer>
          
         <Button variant="primary" onClick={handleClose}>
             Upload File
           </Button>   
       </Modal.Footer>
      </Modal>
           <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Department Name</th>
          <th>Writer</th>
          <th>Serial No</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      
{/* {booklist.map((item, index)=>(
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>otto</td>
          <td>@hghg</td>
            <td><Link to={`https://sms-backend-w3z3.onrender.com/${item.url}`} target='_blank'>Read</Link></td>
         </tr>
))} */}


{booklist.map((item, index)=>(
  <tr key={item._id || index}>
    <td>{index + 1}</td>
    <td>{item.name}</td>
    <td>{item.departmentname}</td>
    <td>{item.writer}</td>
    <td>{item.serial}</td>
    <td>
      <Link to={`https://sms-backend-w3z3.onrender.com/${item.url}`} target='_blank'>
         <Button variant="outline-danger"  style={{ fontSize: '15px', padding: '5px 20px' }} >
      Read
    </Button>
      </Link>
    </td>
  </tr>
))}


         

       
      </tbody>
    </Table>
       </div>
    </div>
  );
};

export default PDF
