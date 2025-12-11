import Sidebar from "../components/sidebar";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useNavigate } from 'react-router';





const Teacher = () => {
  let navigate = useNavigate()
const [show, setShow] = useState(false);
const [teachername, setTeacherName] = useState(""); //new
const [departmentname, setDepartmentName] = useState(""); //new
const [teacherid, setTeacherId] = useState(""); //new
const [phonenumber, setPhoneNumber] = useState("");  //new
const [teacherList, setTeacherList] = useState([]); //new
let [Update,setUpdate] = useState(false)  //new
let [searchList,setSearchList] = useState ([])  //new
let [userData,setUserData] = useState([])
const [mongoId, setMongoId] = useState("") //new


 // const handleClose = () => setShow(false); //off krechi match hoawte
  //const handleShow = () => setShow(true);



  /* new start*/ 

const handleCloseForUpdate = () => {
  console.log("hello",teacherid)
   //setLoading(true);
   axios.patch(`http://localhost:5000/teacher/${teacherid}`, {
      teachername: teachername,
      departmentname: departmentname,
      teacherid: teacherid,
     phonenumber: phonenumber

     }).then(()=>{
     axios.get("http://localhost:5000/allteacher").then((data)=>{
     console.log("Teacher Data:", data.data);
    
        //setLoading(false);
        setShow(false);
        setTeacherList(data.data);
  });
    
    });
   
  };





  const handleClose = () => {
   // setLoading(true);
    axios.post("http://localhost:5000/createteacher", {
      teachername: teachername,
      departmentname: departmentname,
      teacherid: teacherid,
      phonenumber: phonenumber

    }).then(()=>{
     axios.get("http://localhost:5000/allteacher").then((data)=>{
     console.log("Teacher Data:", data.data);
    
        //setLoading(false);
         setShow(false);
         setTeacherList(data.data);
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
      setTeacherId("")
      setTeacherName("")
     setShow(true)
  };
  // const handleShowModal = (id) =>{
  //   setUpdate(true)
  //  // console.log(id)
  //   axios.get(`http://localhost:5000/teacher/${id}`).then((data)=>{
  //     console.log(data.data[0])
  //     setDepartmentName(data.data[0].departmentname)
  //     setPhoneNumber(data.data[0].phonenumber)
  //     setTeacherId(data.data[0].teacherid)
  //     setTeacherName(data.data[0].teachername)
  //     setTeacherId(data.data[0]._id)
      
  //   })
  //   setShow(true)
  // };
const handleShowModal = (id) =>{
  setUpdate(true)

  axios.get(`http://localhost:5000/teacher/${id}`).then((data)=>{
    const teacher = data.data[0]

    setDepartmentName(teacher.departmentname)
    setPhoneNumber(teacher.phonenumber)
    setTeacherId(teacher.teacherid)   // ✅ user-written id
    setTeacherName(teacher.teachername)
    setMongoId(teacher._id)           // ✅ real mongo _id
  })

  setShow(true)
};



   /* new close*/ 


  useEffect( ()=> {
      axios.get("https://jsonplaceholder.typicode.com/users").then((data)=>{
          setUserData(data.data)
      })
  },[])


useEffect(()=>{
    let data = localStorage.getItem("userInfo")

    if(!data){
      navigate("/login")
    }

},[])



/* new start*/ 

useEffect(()=>{
  axios.get("http://localhost:5000/allteacher").then((data)=>{
     console.log("Teacher Data:", data.data);
    setTeacherList(data.data)
  })
},[])



let handleDelete = (id)=>{
  console.log("Deleting:", id);
  axios.post("http://localhost:5000/delete",{ id })
  .then(()=>{
 axios.get("http://localhost:5000/allteacher").then((data)=>{
     console.log("Teacher Data:", data.data);
    setTeacherList(data.data);
     
  });
  })
}

let handleSearch = (e) => {
  let newArr = []
  teacherList.map(item =>{
   if (item.teachername == e.target.value){
    console.log(item.teachername)
    newArr.push(item)
   }
 
  });
  setSearchList(newArr)
};


/* new close*/ 





  return (
    <div className='main'>
      <div className='left'>
      <Sidebar/>
      </div>
      <div className='right'>
         <Button variant="primary" onClick={handleShow}>
        Add Teacher
      </Button>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Teacher Name</Form.Label>
        <Form.Control onChange={(e)=>setTeacherName(e.target.value)} type="text" placeholder="Enter Name" value={teachername} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Department Name</Form.Label>
        <Form.Control  onChange={(e)=>setDepartmentName(e.target.value)} type="text" placeholder="Enter Department Name" value={departmentname} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Teacher Id </Form.Label>
        <Form.Control onChange={(e)=>setTeacherId(e.target.value)}  type="text" placeholder="Entet Id" value={teacherid} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control onChange={(e)=>setPhoneNumber(e.target.value)} type="text" placeholder="Enter Number" value={phonenumber} />
      </Form.Group>

     
    </Form>
        </Modal.Body>
         <Modal.Footer>
            {Update
                ?
                <Button  variant="primary" onClick={()=>handleCloseForUpdate()} >
             Update Teacher
           </Button>

                :
                <Button variant="primary" onClick={handleClose} >
             Create Teacher
           </Button>
            }
       </Modal.Footer>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Create Teacher
          </Button>
        </Modal.Footer> */}
      </Modal>


      {/* Table Start */}


 <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Teacher Name</th>
          <th>Department</th>
          <th>Phone Number</th>
          <th>Teacher Id</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>


{/* new start */}

 {searchList.length > 0 ? (
  searchList.map((item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.teachername}</td>
      <td>{item.departmentname}</td>
      <td>{item.phonenumber}</td>
      <td>{item.teacherid}</td>
      <td>
        <Button variant="primary" onClick={() => handleShowModal(item._id)}>Edit</Button>
        <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
      </td>
    </tr>
  ))
) : (
  teacherList.map((item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.teachername}</td>
      <td>{item.departmentname}</td>
      <td>{item.phonenumber}</td>
      <td>{item.teacherid}</td>
      <td>
        <Button variant="primary" onClick={() => handleShowModal(item._id)}>Edit</Button>
        <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
      </td>
    </tr>
  ))
)} 


{/* new close */}






{/* {userData.map((item,index)=>(

        <tr>
          <td>{index+1}</td>
          <td>{item.name}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
        </tr>

))}


        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
         */}



      </tbody>
    </Table>




      </div>
    </div>
  )
}

export default Teacher