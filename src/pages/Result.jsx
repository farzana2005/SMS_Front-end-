import Sidebar from "../components/sidebar";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { data } from "react-router";
import Table from 'react-bootstrap/Table';






const Result = () => {
  
  
  const [show, setShow] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [resultField,setResultField] =  useState([])
  const [studentId,setStudentId] = useState("")
  const [departmentName,setDepartmentName] = useState("")
  const [resultList,setResultList] = useState([])
  
  



useEffect(()=>{
  axios.get("https://sms-backend-w3z3.onrender.com/allstudent").then((data)=>{
     console.log("Student Data:", data.data); 
     console.log(data)
    setStudentList(data.data)
  })
},[])

let handleAddResult = () => {
  setResultField([...resultField, { subject: "", result: "" }]);
};

let handleDelete = (id) => {
 let arr =resultField
 arr.splice(id,1);
 setResultField([...arr])
 console.log(arr)
};


const handleChange = (index, field, value) => {
  const updatedFields = [...resultField];  // পুরনো state কপি
  updatedFields[index][field] = value;     // নির্দিষ্ট subject/result আপডেট
  setResultField(updatedFields);           // নতুন state সেট করো
};

let handleSubjectChange = (e, id)=>{
  resultField[id].subject = e.target.value
  console.log(resultField)

}
let handleResultChange = (e, id)=>{
  resultField[id].result = e.target.value
  console.log(resultField)

}

let handleSubmit = () => {
  axios.post("https://sms-backend-w3z3.onrender.com/result", {
    "departmentname": departmentName,   // variable যাক
    "studentid": studentId,            // real student ID যাক
    "result": resultField
  }).then((data) => {
    console.log("abcdef", data);
  });
};


useEffect(()=>{
  axios.get("https://sms-backend-w3z3.onrender.com/result").then((data)=>{
    setResultList(data.data)
  })
},[])






  return (
    <div className='main'>
      <div className='left'>
      <Sidebar/>
      </div>
      <div className='right'>
   
 <>
      <Button variant="primary" onClick={handleShow}>
        Add Result
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          
          <Form.Label>Department</Form.Label>
      <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        onChange={(e)=>setDepartmentName(e.target.value)}
      />
      <br />
        <Form.Select aria-label="Default select example" onChange={(e)=>setStudentId(e.target.value)}>
      <option>Select Student</option>

      {studentList.map(item => (

     <option key={item._id} value={item._id}>
      {item.studentname}
    </option>
  ))}
     </Form.Select>


     {/* Start */}

  <Button onClick={handleAddResult}>Add Result</Button>

{resultField.map((item, index) => (
  <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
    <div className="left" style={{ marginRight: "10px" }}>
      <Form.Control
        type="text"
        placeholder="Subject"
       aria-describedby="passwordHelpBlock"
        onChange={(e)=>handleSubjectChange(e,index)}
        //value={item.subject}
       // onChange={(e) => handleChange(index, "subject", e.target.value)}
      />
    </div>
    <div className="right" style={{ marginRight: "10px" }}>
      <Form.Control
        type="text"
        placeholder="Result"
        aria-describedby="passwordHelpBlock"
        onChange={(e)=>handleResultChange(e,index)}
        //value={item.result}
        //onChange={(e) => handleChange(index, "result", e.target.value)}



      />

    </div>
    <Button onClick={() => handleDelete(index)} variant="danger">
      Delete
    </Button>
  </div>
))}



       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit }>
              Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>


{/* table */}

 <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Student Name</th>
      <th>Department Name</th>
      <th>CGPA</th>
    </tr>
  </thead>

  <tbody>
    {resultList.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.studentid?.studentname}</td>
        <td>{item.departmentname}</td>
        <td>{item.cgpa}</td>
      </tr>
    ))}
  </tbody>
</Table>



      </div>
    </div>
  )
}

export default Result;