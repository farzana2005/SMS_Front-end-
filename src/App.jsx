import { Routes, Route } from "react-router";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './pages/Registration';
import Login from './pages/Login';
import Teacher from './pages/Teacher';
import Student from './pages/Student';
import PDF from "./pages/PDF";
import Leave from "./pages/Leave";
import Result from "./pages/Result";
import Payment from "./pages/Payment";
import PaymentSuccess from './pages/PaymentSuccess';






function App() {
  

  return (
    <>
      <Routes>
        
        <Route path="/" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/teacher" element={<Teacher/>}/>
        <Route path="/student" element={<Student/>}/>
        <Route path="/pdf" element={<PDF/>}/>
        <Route path="/leave" element={<Leave/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/payment" element={<Payment/>}/>
       
       
      </Routes>
        
    </>
  )
}

export default App